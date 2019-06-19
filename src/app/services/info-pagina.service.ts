import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPaginaInterface } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPaginaInterface = {};

  constructor( private http: HttpClient) {
    // console.log('Servicio de infoPagina listo...');

    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe ( (resp: InfoPaginaInterface) => {
        console.log(resp);
        console.log(resp.facebook);
        console.log(resp['twitter']);

        this.info = resp;
      });
  }
}
