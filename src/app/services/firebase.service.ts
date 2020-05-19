import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Action} from 'rxjs/internal/scheduler/Action';

export interface estructura{
  id?:string;
  nombre:string;
  mensaje:string;
  email:string;
  //calificacion:string;
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private Collection:AngularFirestoreCollection<estructura>;
  private videojuegos$:Observable<estructura[]>;

  constructor(
    db:AngularFirestore
  ) {  
    this.Collection=db.collection<estructura>('mensajes');
    this.videojuegos$=this.Collection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(action =>{
          const data = action.payload.doc.data();
          const id= action.payload.doc.id;
          return{id,...data};
        });
      }
    ));
  }

  //agregarVideojuegos(nombre_,precio_,tipo_,calificacion_){
    agregarVideojuegos(nombre_,mensaje_,email_){
    this.Collection.add({
      nombre:nombre_,
      mensaje:mensaje_,
      email:email_
    });
  }
  verVideojuegos(){
    return this.videojuegos$;
  }
  verVideojuego(id:string){
    return this.Collection.doc<estructura>(id).valueChanges();
  }
  updateVideoJuegos(p:estructura, id:string){
    return this.Collection.doc(id).update(p);
  }
  eliminarVideoJuegos(id:string){
    return this.Collection.doc(id).delete();
  }
  
  
}
