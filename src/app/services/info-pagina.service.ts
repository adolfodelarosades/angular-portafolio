import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPaginaInterface } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPaginaInterface = {};
  equipo: any[] = [];

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe ( (resp: InfoPaginaInterface) => {
        this.info = resp;
      });
  }

  private cargarEquipo(){
    // Leer el API REST FIREBASE
    this.http.get('https://angular-portafolio-52ee6.firebaseio.com/equipo.json')
      .subscribe ( (resp: any[]) => {
        this.equipo = resp;
        // console.log(resp);
      });
  }
}
