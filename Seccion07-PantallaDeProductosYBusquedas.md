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

* En **item.component.ts** vamos a definir la propiedad **producto** de tipo **ProductoInterface**, lo podríamos hacer así:

    `producto: ProductoInterface = {};`

    Pero si lo hago así me marca error porque las propiedades en la interface son obligatorias, tendría que ponerles **?** a todas ellas para que sean opcionales, cosa que no vamos a hacer, por lo que en lugar de ello pondremos solo:

    `producto: ProductoInterface;`

    Si solo la declaramos **producto** tendría el valor de **undefined**, por lo que sería un problema al usarlo, ya veremos cómo solventar el error.

* Asigno lo que obtengo del servicio a esta propiedad:

    `this.producto = producto;`

* En **item.component.html** vamos a sustituir los valores harcodeados por lo que regresa el servicio. Por ejemplo:

    `<h1 class="ae-u-bolder rk-portfolio-title ">Essential Stationery</h1>`

    Por esto:

    `<h1 class="ae-u-bolder rk-portfolio-title ">{{ producto.producto }}</h1>`

    Si vamos al navegador vemos que ya toma el valor del servicio, pero sin embargo nos marca el error:

    `ERROR TypeError: Cannot read property 'producto' of undefined`

    Esto es porque en el **ts** no inicializamos el valor de producto, podríamos solventar el error si ponemos un **?** al usar producto:

    `<h1 class="ae-u-bolder rk-portfolio-title ">{{ producto?.producto }}</h1>`

    Esto nos elimina el error, pero tendríamos que hacer siempre lo mismo al usar **producto** 

    La otra forma de solventar el problema es preguntar al inicio de la sección si el producto existe, continua de lo contrario no renderiza nada del producto, esto lo hacemos con:

    `<section *ngIf="producto" ....`

    De esta forma ya no nos marca el error.

* Cambiamos los valores harcodeados por los recuperados del servicio:

    ```
    <h4 class="ae-u-bolder">{{ producto.subtitulo2 }}</h4>
    <p class="ae-eta">{{ producto.desc1 }}</p>
    ```

* Para modificar las imágenes tenemos que tener en cuenta que están almacenadas en la carpeta **assets/productos/prod-X**, aquí **prod-X** se refiere al parámetro que se envia al servicio (QUE NO TENEMOS EN PRODUCTO), por lo que hay que pasarlo de alguna manera desde el **ts** para que el **html** tenga acceso a el. En **item.component.ts** declaramos la propiedad **productoCod** y le asignamos el valor del parámetro:

    ```
    productoCod: string;
    ....
    this.productoCod = parametros['codigo'];
    ```

* Por lo que ya podemos cambiar dos de las fotos (La principal en la siguiente sección). En la primera foto ponemos:

    `<img src="assets/productos/{{ productoCod }}/pic-1.jpg"....`

* En la segunda foto ponemos:

    `<img src="assets/productos/{{ productoCod }}/pic-2.jpg"....`

* Para que esto sea valido todas las fotos de todos los productos deben tener estos nombres pic-1.jpg, pic-2.jpg, etc.

## Reemplazando la imagen principal del producto

* La imagen principal del ítem es un caso especial, ya que se renderiza vía CSS, veamos el siguiente código:

    ```
    <header class="rk-portfolio-cover  item-inside-1">
        <div class="item-inside__meta">
            <h1 class="ae-u-bolder rk-portfolio-title ">{{ producto.producto }}</h1>
            <p class="ae-theta rk-portfolio-category ">{{ producto.categoria }}</p>
        </div>
    </header>
    ```

    La imagen se pinta en el **header** gracias a la clase **item-inside-1**, si vamos al archivo **urku.css** tenemos:

    ```
    .item-inside-1 {
        background-image: url("../img/project-1.jpg");
        background-position: 50% 100%;
        background-size: 350%;
    }
    ```

    Si comentamos:

        `/*background-image: url("../img/project-1.jpg");*/`

    En el navegador ya no sale la imagen.

* En lugar de pintar la imagen vía css, lo haremos usando la directiva **ngStyle**

    ```
    <header [ngStyle]="{'background-image': 'url(assets/productos/'+ productoCod + '/main.jpg)'}" class="rk-portfolio-cover  item-inside-1">
    ```

    Nótese el truco para concatenar **proiductoCod**. 
    
    Para que esto funcione en todos los productos la imagen principal se debe llamar **main.jpg**.

## Creando la página de búsqueda y recoger el termino buscado

* Vamos a implementar la búsqueda en nuestra página, esta opción se encuentra en el **header.component.html**, donde existe un **form** que maneja está opción.

    ```
    <form class="rk-search">
        <input type="text" placeholder="Search" id="urku-search" class="rk-search-field">
        <label for="urku-search">
          <svg>
            <use xlink:href="assets/img/symbols.svg#icon-search"></use>
          </svg>
        </label>
    </form>
    ```

    El hecho de trabajar con **form** implicaría que para manejar el formulario tendríamos que importar el **formModule** y eso cargaría mi página para leer solo un campo.
    
    Existe otra forma de leer el campo sin usar **form** y así no usamos  **formModule**.

    Cambiemos  **form** por un **div**, identificaremos nuestro **input** con una clase **#txtBuscar** y manejaremos el evento **keyup.enter**

    ```
    <div class="rk-search">
        <input type="text" 
               (keyup.enter)="buscarProducto( txtBuscar.value )"  
               placeholder="Buscar..." 
               id="urku-search" 
               class="rk-search-field"
               #txtBuscar>
        <label for="urku-search">
          <svg>
            <use xlink:href="assets/img/symbols.svg#icon-search"></use>
          </svg>
        </label>
    </div>
    ```

* En **header.component.ts** implementamos el método **buscarProducto(valor)**

    ```
    buscarProducto( cadenaBuscar: string ) {
        console.log(cadenaBuscar);
    }
    ```

    Hacemos una pequeña prueba para ver si funciona; todo correcto.

* Debemos crear un nuevo componente **search** el cual se encargará de mostrar el resultado de lo buscado.

    ```
    $ ng g c pages/search --spec=false
    Option "spec" is deprecated: Use "skipTests" instead.
    CREATE src/app/pages/search/search.component.html (25 bytes)
    CREATE src/app/pages/search/search.component.ts (269 bytes)
    CREATE src/app/pages/search/search.component.css (0 bytes)
    UPDATE src/app/app.module.ts (1008 bytes)
    ```

* Necesito incluir una nueva ruta en el **app-routing.module.ts** para este nuevo componente.

    `{ path: 'search/:cadenaBuscar', component: SearchComponent },`

* Necesitamos navegar desde el **header.component.ts** hasta el **search.component.ts** **pasándole el parámetro de búsqueda**, para lo cual debemos inyectar **Router** en **header.component.ts**

    ```
    import { Routes } from '@angular/router';
    ....
    constructor( public infoPagSer: InfoPaginaService,
               private router: Routes ) { }
    ```

* Por lo que el método **buscarProducto(valor)** quedara así:

    ```
    buscarProducto( cadenaBuscar: string ) {
        if (cadenaBuscar.length < 1 ) {
        return;
        }

        // Navega a search
        this.router.navigate(['/search', cadenaBuscar]);
    }
    ```

* En el navegador ya puedo pulsar cualquier texto de búsqueda y me lleva a la página de **search** que aún no está implementada, solo me muestra el mensaje:

    `search works!`

    Y en el URL vemos claramente que se pasa como parámetro el término de búsqueda:

    `http://localhost:4200/#/search/libros`

## Diseño y filtro de la página de búsqueda

* En **search.component.ts** necesitamos recibir el parámetro **cadenaBuscar** para lo cual necesitamos inyectar el **ActivatedRoute** que es el que nos permite manejar parámetros.

    `constructor( private route: ActivatedRoute) { }`

* En **ngOnInit()** recogemos los parámetros, **cadenaBuscar** es el único parámetro que mandamos, recordar que ese nombre fue el que se le dio en **app-routing.module.ts**

    `{ path: 'search/:cadenaBuscar', component: SearchComponent },`


    ```
    ngOnInit() {
        this.route.params
        .subscribe ( params => {
            console.log(params['cadenaBuscar']);
        });
    }
    ```

    En la consola nos pinta **libros**, todo correcto.

* En **productos.service.ts** vamos a declarar una propiedad **productosFiltrados** donde almacenaremos los productos que cumplan con la condición.

    `productosFiltrados: ProductoIDXInterface[] = [];`

* Vamos a crear el método **buscarProducto** que en teoría va a ser el encargado de buscar en nuestro arreglo original los elementos que cumplan la condición y los va a ir metiendo en el nuevo arreglo **productosFiltrados** para lo cual se usa el método **filter** el cual recibe la condición de filtrado, para esta primera versión de nuestro método vamos a incluir todos los elementos poniendo la condición siempre **true**. Mandamos el resultado a la consola.

    ```
    public buscarProducto( termino: string ) {
        this.productosFiltrados = this.productos.filter( producto => {
            return true;
        });
        console.log(this.productosFiltrados);
    }
    ```

    Esto por ahora no tiene mucho sentido porque los dos arreglos tienen los mismos valores. Pero servirá para ver algo que sucede.

* Vamos a inyectar este servicio en **search.component.ts**

    ```
    constructor( private route: ActivatedRoute,
               public productosService: ProductosService ) { }
    ```

* Con el parámetro que recibimos en **search.component.ts** llamamos a **buscarProducto(termino)** del servicio **productos.services.ts**

    ```
    ngOnInit() {
        this.route.params
        .subscribe ( params => {
            console.log(params['cadenaBuscar']);
            this.productosService.buscarProducto(params['cadenaBuscar']);
        });
    }
    ```

* Probemos todo esto, vamos a tener dos casos:

    * Cuando estamos en la Home o en About y hacemos una búsqueda, en la consola se muestra el arreglo **productosFiltrados**

    * Pero cuando ya estoy en la página **search** y la recargo el arreglo **productosFiltrados** aparece vacío.

        ```
        libros
        (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        libros
        []
        ```

    * Esto pasa por que cuando recargamos la página **search** que a su vez llama en su constructor el servicio **producto.service.ts** que en su constructor ejecuta el método **cargarProductos()** en modo asíncrono, mientras tanto al mismo tiempo en **search** continua ejecutando el **ngOnInit()** que llama al método **buscarProducto** del servicio **producto.service.ts** donde carga **productosFiltrados** que dependen de **productos** que es posible que aún no se hayan cargado, por lo que **productosFiltrados** da como resultado un arreglo vacío.
    
* En nuestro **search.component.html** pongamos el código para pintar los resultados.

    ```
    <!-- Productos -->
    <div class="ae-masonry ae-masonry-md-2 ae-masonry-xl-4">
        <a *ngFor="let producto of productosService.productosFiltrados" [routerLink]="['/item/', producto.cod ]" class="animated fadeIn rk-item ae-masonry__item">
            <img src="assets/productos/{{ producto.url }}.jpg" alt="">
            <div class="item-meta">
            <h2>{{ producto.titulo }}</h2>
            <p>{{ producto.categoria }}</p>
            </div>
        </a>
    </div>
    ```

* Si desde la Home hacemos la búsqueda se cargan todos los productos porque es lo que se esta metiendo en **productosFiltrados**, nos sale el enlace:

    `http://localhost:4200/#/search/libros`

    Si recargamos este mismo URL ya no aparece nada, por el error que se mencionó anteriormente.

## Arreglar la lógica del proceso de carga usando Promise

Vamos a resolver el problema de que cuando refrescamos la página **search** no nos aparecen los productos en la consola.

* Abrimos **productos.service** vamos a hacer unos cambios en el método **cargarProductos()**.

    ```
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
    ```

    * Hemos realizado lo siguiente:

        * Convertir este método en una **Promise** para hacerlo asíncrono (ES6). Permite ejecutar cierto código hasta que se resuelva. Una **Promise** tiene un **callback** que recibe dos parámetros **resolve** y **reject**

        * Metemos todo nuestro código dentro de la promesa.

        * Hasta aquí la promesa se ejecuta, pero no nos está notificando si ya se hizo o no.

        * Para indicar que la promesa termino exitosamente al finalizar el código ponemos **resolve();**

* En el método **cargarProductos()** vamos a ejecutar el filtro cuando sepamos que existen datos.

    ```
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
    ```

    * Hemos realizado lo siguiente:

        * Si no existen datos en el arreglo **productos**, ejecutamos el método **cargarProductos()** y esperamos que se ejecute para entonces (**then** solo por que es **Promise**) filtramos los productos.

        * Si ya existen datos en el arreglo **productos**  filtramos los productos.

* En el método **filtrarProductos( termino)** por ahora solo pintamos el arreglo **productos** para comprobar que siempre tiene productos.

    ```
    private filtrarProductos( termino: string ) {
        console.log(this.productos);
    }
    ```

* Cuando recargamos ya me muestra el arreglo **productosFiltrados** con valores

    `(15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]`

    `(15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]`


## Filtrar los datos
Vamos a implementar el método **filtrarProductos( termino)** teniendo las siguientes consideraciones:

* Limpiar el arreglo **productosFiltrados** en cada nueva búsqueda

* Recorrer el arreglo **productos** mediante un **forEach**

* Para cada producto verificamos en su **titulo** y **categoria** si existe el término a buscar, no importando si está en mayúsculas o minúsculas

* Si coincide incluir ese producto en **productosFiltrados** 

* Al implementarlo se mostrará el resultado

    ```
    private filtrarProductos( termino: string ) {
        console.log(this.productos);
        termino = termino.toLocaleLowerCase();
        this.productosFiltrados = [];

        this.productos.forEach( prod => {
        const categoria = prod.categoria.toLocaleLowerCase();
        const titulo = prod.titulo.toLocaleLowerCase();
        if ( categoria.indexOf(termino) >= 0 || titulo.indexOf(termino) >= 0 ){
            this.productosFiltrados.push( prod );
        }
        });
    }
    ```
    
## Código fuente de la sección

:+1: