import { ListaIteam } from './listas-iteam.model';

export class Lista {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  terminada: boolean;

  iteams: ListaIteam[];

  constructor( titulo:string) {
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.terminada = false;
    this.iteams = [];
    this.id = new Date().getTime();
  }

}