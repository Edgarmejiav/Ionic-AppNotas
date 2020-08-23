import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  
  @Input() tareaterminada = true;
  @ViewChild(IonList) lista: IonList;

  constructor(public deseoService: DeseosService, private router: Router, private alerCtrl: AlertController) { 
    
  }

  
  ngOnInit() { }

  listaSeleccionada(lista: Lista) {
    if (this.tareaterminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    else
    {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }
  
  elimnarLista(lista: Lista) {
    this.deseoService.borrarLista(lista);
    
  }
  async editarLista(lista:Lista) {
    const alert = await this.alerCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nueva tarea'
        }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.lista.closeSlidingItems();

          }    
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.titulo.length === 0)
              return;
            lista.titulo = data.titulo;
            this.deseoService.guardarStorage();
            this.lista.closeSlidingItems();
              
          }
        }
      ]
    });

    await alert.present();
  }



}
