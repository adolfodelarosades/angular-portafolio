import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoIDXInterface } from '../interfaces/producto_idx.iterface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoIDXInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoIDXInterface[]) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 2000);
      });
  }

  public getProducto( codigo: string ) {
    return this.http.get(`https://angular-portafolio-52ee6.firebaseio.com/productos/${codigo}.json`);
  }

}
