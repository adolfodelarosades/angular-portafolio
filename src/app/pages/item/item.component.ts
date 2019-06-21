import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoInterface } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoInterface;
  productoCod: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {
        this.productoService.getProducto(parametros['codigo'])
          .subscribe( (producto: ProductoInterface) => {
            this.productoCod = parametros['codigo'];
            console.log( producto);
            this.producto = producto;
          });
      });
  }

}
