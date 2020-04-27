import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Action} from 'rxjs/internal/scheduler/Action';

export interface estructura{
  id?:string;
  nombre:string;
  precio:string;
  tipo:string;
  calificacion:string;
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
    this.Collection=db.collection<estructura>('videojuegos');
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

  agregarVideojuegos(nombre_,precio_,tipo_,calificacion_){
    this.Collection.add({
      nombre:nombre_,
      precio:precio_,
      tipo:tipo_,
      calificacion:calificacion_
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
