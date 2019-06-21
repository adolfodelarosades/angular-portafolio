import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoIDXInterface } from '../interfaces/producto_idx.iterface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoIDXInterface[] = [];
  productosFiltrados: ProductoIDXInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise ( (resolve, reject) => {
      this.http.get('https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductoIDXInterface[]) => {
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
            resolve();
          }, 2000);
        });
      });
  }

  public getProducto( codigo: string ) {
    return this.http.get(`https://angular-portafolio-52ee6.firebaseio.com/productos/${codigo}.json`);
  }

  public buscarProducto( termino: string ) {

    if ( this.productos.length === 0) {
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos
        // aplicar el filtro
        this.filtrarProductos( termino);

      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino);
    }
  }

  private filtrarProductos( termino: string ) {
    console.log(this.productos);
  }

}
