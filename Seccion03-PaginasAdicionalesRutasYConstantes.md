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
    **<router-outlet></router-outlet>**
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

## Uso del hash en las rutas

## Código fuente de la sección


