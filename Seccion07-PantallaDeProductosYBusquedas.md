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

¿Como hacemos para recuperar la información de cada producto?

* Si nos vamos a Firebase, en la tabla **productos** y seleccionamos un producto en particular se abre un enlace con los datos únicamente de ese producto.

    ```
    https://angular-portafolio-52ee6.firebaseio.com/productos/prod-4
 
    angular-portafolio-52ee6 > productos > prod-4
 
    prod-4
        categoria: "comida"
        desc1: "Lorem ipsum dolor sit amet, consectetur adipisi..."
        desc2: "Lorem ipsum dolor sit amet, consectetur adipisi..."
        producto: "Café caliente"
        resumen: "Lorem ipsum dolor sit amet, consectetur adipisi..."
        subtitulo1: "El peor café del mundo!"
        subtitulo2: "Pero aún así, lo amarás!"
    ```

    El URL que se genera lo podemos abrir en cualquier navegador añadiéndole **.json** y tendremos un End-Point que nos retornara un **objeto** con los datos del producto seleccionado.

    `https://angular-portafolio-52ee6.firebaseio.com/productos/prod-4.json` 

    [json](https://angular-portafolio-52ee6.firebaseio.com/productos/prod-4.json)


* Necesitamos crear un servicio que recupere los datos de un producto particular, lo creamos en **productos.service.ts**

    ```
    public getProducto( codigo: string ) {
    return this.http.get(`https://angular-portafolio-52ee6.firebaseio.com/productos/${codigo}.json`);
    }
    ```

    Hay varias cosas que observar en este método:

    * Usamos \`\` para permitir concatenar variables dentro de una cadena usando **${codigo}** 
    * Retorna todo el observable, aquí no me suscribo, eso se hará en el lugar donde se recupere el observable.

* Necesitamos crear una interface **producto** en la carpeta **interfaces** creamos el archivo **producto.interface.ts**

    * Copiamos el JSON de un producto en particular, por ejemplo:

        `https://angular-portafolio-52ee6.firebaseio.com/productos/prod-1.json`

    * Regresamos a **producto.interface.ts** y presionamos **Ctrl + Shift + P**

    * Buscamos y seleccionamos **JSON to TS**

    * La interface se crea, le cambio el nombre para que quede así:

        ```
        export interface ProductoInterface {
            categoria: string;
            desc1: string;
            desc2: string;
            producto: string;
            resumen: string;
            subtitulo1: string;
            subtitulo2: string;
        }
        ```
* Regreso a **item.component.ts** e inyecto el servicio **producto.service** en el **constructor**

    ```
    constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }
    ```

* En **ngOnInit()** voy a usar el servicio creado:

    ```
    ngOnInit() {
        this.route.params
            .subscribe( parametros => {
                this.productoService.getProducto(parametros['codigo'])
                    .subscribe( (producto: ProductoInterface) => {
                        console.log( producto);
                    });
            });
    }
    ```

    Nótese que se llama al servicio **getProducto()** pasándole el parámetro **codigo** y es aquí donde se hace el **subscribe** no en el servicio, lo recuperado se guarda en **producto** declarado de tipo **ProductoInterface** para poder usar los campos sin problema.

    En consola se muestra:

    ```
    {categoria: "ropa", desc1: "Lorem ipsum dolor sit amet, consectetur adipisicin… qui officia deserunt mollit anim id est laborum.", desc2: "Lorem ipsum dolor sit amet, consectetur adipisicin… qui officia deserunt mollit anim id est laborum.", producto: "Camisetas con diseños", resumen: "Lorem ipsum dolor sit amet, consectetur adipisicin… qui officia deserunt mollit anim id est laborum.", …}
    ```

## Actualizando la página del producto

## Reemplazando las imágenes del producto

## Creando la página de búsqueda

## Diseño y filtro de la página de búsqueda

## Lógica del proceso de carga y filtro

## Código fuente de la sección
