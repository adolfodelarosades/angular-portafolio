import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  constructor( private http: HttpClient) {
    // console.log('Servicio de infoPagina listo...');

    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe ( resp => {
        console.log(resp);

        console.log(resp['twitter']);
      });
  }
}
