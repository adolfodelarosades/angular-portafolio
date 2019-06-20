import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.iterface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: ProductoInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[]) => {
        this.productos = resp;
      });
  }

}
