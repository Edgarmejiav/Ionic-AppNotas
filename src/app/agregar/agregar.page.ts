import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import {  ActivatedRoute } from '@angular/router';
import { Lista } from '../models/lista.model';
import { ListaIteam } from '../models/listas-iteam.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreIteam = '';
    
  constructor(private deseoService: DeseosService, private route :ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseoService.obtenerLista(listaId);
  }
  
  agregarIteam() {
    if (this.nombreIteam.length === 0) {
      return;
    }
    const nuevoIteam = new ListaIteam(this.nombreIteam);
    this.lista.iteams.push(nuevoIteam);
    this.nombreIteam = '';
    this.deseoService.guardarStorage();
  }
  cambioCheck(iteam: ListaIteam) {
    
    const pendientes = this.lista.iteams.filter(iteamData => iteamData.completado).length;

    if (pendientes === 0)
    {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
      }
    
    this.deseoService.guardarStorage();
    
  }

  borrar(i: number) {
    this.lista.iteams.splice(i, 1);
    this.deseoService.guardarStorage();
    
  }

  ngOnInit() {
  }

}
