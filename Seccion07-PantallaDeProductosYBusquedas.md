# Pantalla de productos y búsquedas

## Introducción a la sección

:+1:

## Enviando parámetros por URL

Necesitamos que cada que pulsemos en un producto se vaya a la página de información de ese producto, actualmente todo se va a **/item** es decir, todo pinta el mismo producto.
Debemos mandar un parámetro para indicar que producto deseamos pintar.

* Para que una ruta pueda mandar un parámetro debemos modificar la ruta en el **app-routing.module.ts**, añadiendo un nombre de parámetro que deseamos mandar.

    `{ path: 'item/:codigo', component: ItemComponent },`

    Al hacer este cambio y pulsar en los productos no se va al producto como antes, esto es porque la ruta **/item** ya no es válida, tengo que especificarle el código del producto.

* Si recordamos **productos_idx** esta compuesto por los siguientes  campos:

    ```
    categoria: "papeleria"
    cod: "prod-1"
    titulo: "Diferentes papeles"
    url: "project-1"
    ```

    en **cod** tenemos el código del producto que a la vez es el identificador para cada producto en la tabla **productos**, es la forma de relacionar las dos tablas.

* Enviar **cod** como parámetro  en **portafolio.component*.html**, existen dos formas de hacerlo:

    `<a *ngFor="let producto of productosService.productos" routerLink="/item/{{ producto.cod }}" class="animated fadeIn rk-item ae-masonry__item">`

    o como un arreglo de elementos donde cada parámetro es un elemento:

    `<a *ngFor="let producto of productosService.productos" [routerLink]="['/item/', producto.cod ]" class="animated fadeIn rk-item ae-masonry__item">`

    Cada que pulsemos en un elemento nos manda a su respectiva ruta:

    ```
    http://localhost:4200/#/item/prod-10
    http://localhost:4200/#/item/prod-3
    http://localhost:4200/#/item/prod-7
    ...
    ```

* Para leer los parámetros que se envían en el URL, necesitamos un servicio que se debe inyectar en la página que recibe los parámetros en este caso **item.component.ts**

    ```
    import { ActivatedRoute } from '@angular/router';
    ...
    constructor( private route: ActivatedRoute) { }
    ```

* Ahora en el **ngOnInit()** Podemos recibir y manipular esos parámetros de la siguiente forma:

    ```
    ngOnInit() {
        this.route.params
        .subscribe( parametros => {
            console.log(parametros);
            console.log(parametros.codigo);
            console.log(parametros['codigo']);
        });
    }
    ```

    En **parametros** recibimos todos los parámetros enviados y  podemos seleccionar uno en particular:

    ```
    {codigo: "prod-10"}
    prod-10
    prod-10
    ```

## Servicio para obtener el producto

## Actualizando la página del producto

## Reemplazando las imágenes del producto

## Creando la página de búsqueda

## Diseño y filtro de la página de búsqueda

## Lógica del proceso de carga y filtro

## Código fuente de la sección
