# Páginas adicionales, rutas, y constantes

## Introducción a la sección

:+1:

## Creando la página about

1. Creación del componente **about** en el directorio **pages**

    `ng g c pages/about --spec=false`

2. Modificar contenido del **about.component.html**

    * Insertar el código de la sección **div** del archivo **about.html** de la plantilla

3. Modificar contenido de **app.component.html**

    * Hacer referencia al nuevo componente (por ahora es la única forma de testear el nuevo componente):

        `<app-header></app-header>`

        `<section class="ae-container-fluid rk-main">`

        `<!-- <app-portafolio></app-portafolio> -->`

        `<app-about></app-about>`

        `</section>`
        
        `<app-footer></app-footer>`

## Tarea - Creando la página del producto

1. Creación del componente **item** en el directorio **pages**

    `ng g c pages/item --spec=false`

2. Modificar contenido del **item.component.html**

    * Insertar el código de la sección **section** del archivo **portafolio-item.html** de la plantilla

3. Modificar contenido de **app.component.html**

    * Hacer referencia al nuevo componente (por ahora es la única forma de testear el nuevo componente):

        `<app-header></app-header>`

        `<section class="ae-container-fluid rk-main">`

        `<!-- <app-portafolio></app-portafolio> -->`

        `<!-- <app-about></app-about> -->`

        `<app-item></app-item>`

        `</section>`
        
        `<app-footer></app-footer>`


## Resolución - Creando la página del producto

:+1:

## Creando rutas para nuestro sitio web

* Dentro del directorio **app** creamos el archivo **app-routing.module.ts**

* Tecleamos el siguiente contenido en el archivo **app-routing.module.ts**
 
    ```javascript
    const app_routes: Routes = [
        { path: '', component: PortafolioComponent },
        { path: 'about', component: AboutComponent },
        { path: 'item', component: ItemComponent },
        { path: '**', pathMatch: 'full', redirectTo: '' }
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot( app_routes )
        ],
        exports: [
            RouterModule
        ]
    })

    export class AppRoutingModule {

    }
    ```    

* Modificamos **app.module.ts** para incluir el módulo de las rutas **app-routing.module.ts**

    ```javascript
    imports: [
       BrowserModule,
       AppRoutingModule
    ],
    ```

* Para que renderice las diferentes páginas debe cambiar el **app.component.html** usando el **router-outlet**

    ```
    <app-header></app-header>
    <section class="ae-container-fluid rk-main">
    <router-outlet></router-outlet>
    </section>
    <app-footer></app-footer>
    ```

* Si cargamos la aplicación y nos manda el siguiente error

    ```
    Uncaught Error: Template parse errors:
    'router-outlet' is not a known element:
    1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
    2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA'
    ```

    Es por que nos falto incluir el siguiente código

    ```
    exports: [
        RouterModule
    ]
    ```

* Ya puedo cargar las diferentes rutas que ingresamos en **app-routing.module.ts**

    ```
    http://localhost:4200/portafolio
    http://localhost:4200/item
    http://localhost:4200/about
    http://localhost:4200/cualquiercosa
    ```

## Editando el menú de navegación

Vamos a enlazar nuestras opciones de menú con las rutas declaradas en el **app-routing.module.ts**

La forma de hacerlo es cambiando los **href** por **routerLink**, es lo que usa Angular, además también usaremos **routerLinkActive** para indicar la ruta activa.

* Debemos hacer un ajuste en nuestro **app-routing.module.ts** ya que al tener

    `{ path: '', component: PortafolioComponent },`

    Causa un conflicto con todas las rutas todas creen que empiezan así, siempre es mejor asignar un valor, por lo que nuestras nuevas rutas son:

    ```
    { path: 'home', component: PortafolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'item', component: ItemComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ```

* Cambiar las rutas en **header.component.ts**

    ```
    <li routerLinkActive="active" class="rk-menu__item">
        <a routerLink="home" class="rk-menu__link">Home</a>
    </li>
    <li routerLinkActive="active" class="rk-menu__item">
        <a routerLink="about" class="rk-menu__link">About</a>
    </li>
    ```

* Cambiar las rutas en **footer.component.ts**

    ```
    <li routerLinkActive="active" class="rk-menu__item">
        <a routerLink="about" class="rk-menu__link">About</a>
    </li>
    ```

* Cambiar la ruta a un ítem en **portafolio.component.html**

    ```
    <a routerLink="/item" class="rk-item ae-masonry__item">
    ```

## Uso del hash en las rutas

* Adelantándonos un poco al momento en el que tengamos que desplegar la página en el servidor, vamos a ver algunas consideraciones que debemos tener. Suponiendo que tengo el enlace:

    `www.miservidor/item/1`

* Normalmente se considera que item es una carpeta que dentro tiene otra carpeta 1, y dentro de esto tienen un archivo index.html, para relacionar este archivo con esa carpeta se utiliza el archivo .htaccess donde se configura lo explicado anteriormente, como esta página la vamos a subir a github pages, nosotros no tenemos acceso a ese archivo y es posible que si lo dejamos así nuestra página no vaya bien, por lo que vamos a hacer un uso de un hash en la ruta para indicarle que en este caso item no es una carpeta sino más bien forma parte de la ruta.

* Para configurar el hash de una forma general abrimos el archivo app-routing.module.ts y en la parte de los imports:

    `RouterModule.forRoot( app_routes, { useHash: true} )`

* Por lo que ahora nuestras rutas quedan así:

    ```
    http://localhost:4200/#/home
    http://localhost:4200/#/item
    http://localhost:4200/#/about

    ```

* Este hash indica a los navegadores web que lo que viene después del # realmente no es un directorio en el servidor, sino que es una parte de la ruta, con esto podremos subir nuestra página a servidores donde no podamos tener acceso al archivo .htaccess, si tuviéramos acceso a este archivo en nuestro servidor podríamos configurar sin usar el hash.

## Código fuente de la sección

:+1:

