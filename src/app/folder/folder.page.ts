import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FirebaseService,estructura} from '../services/firebase.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public juegos: estructura[];
  public nombre:string;
  public mensaje:string;
  public email:string;
  //public calificacion:string;

  constructor(
    private activatedRoute: ActivatedRoute,    
    private ruta:ActivatedRoute,
    private firebase:FirebaseService    
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.firebase.verVideojuegos().subscribe(res=>{ console.log('juegos',res);      this.juegos=res;    });
    this.firebase.verVideojuegos().subscribe(res=>{
      console.log('juegos',res);
      this.juegos=res; 
    });
  }
  agregar_juego(nombre_, mensaje_,email_){
    console.log(nombre_,mensaje_,email_) ;
    this.firebase.agregarVideojuegos(nombre_, mensaje_,email_);
    console.log("juego Agregado");
  }
  agregar_Juego(){
    this.firebase.agregarVideojuegos(this.nombre, this.mensaje, this.email);
    console.log("Usuario REgistrado");
  }
  
  eliminar(id){
    this.firebase.eliminarVideoJuegos(id).then(res=>{
      console.log("Eliminado");
    });
  }

}
