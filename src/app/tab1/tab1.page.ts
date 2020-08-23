import { Component } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 
  constructor(public deseoService: DeseosService, private router: Router, private alerCtrl:AlertController) { }
  
  async agregarLista() {
    const alert = await this.alerCtrl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nueva tarea'
        }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          }    
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0)
              return;
           
           const listaId= this.deseoService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)
              
          }
        }
      ]
    });

    await alert.present();

    //
  }

 
}
