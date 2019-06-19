# Servicios, Constantes y HTTP

## Introducción a la sección

:+1:

## Creando un archivo JSON con la información

* Creación del archivo **data-pagina.json** en el directorio **assets/data**

* Introducir contenido

    ```
    {
        "titulo": "urku portfolio <sup _ngcontent-ovx-c1=''>tm</sup>",
        "email": "contact@urkuportfolio.com",
        "nombre_corto": "urku portfolio",
        "pagina_autor": "https://www.pixeden.com/html5-website-templates/urku-html5-portfolio-website",
        "facebook": "https://www.facebook.com/pixeden/",
        "twitter": "http://twitter.com/pixeden",
        "instagram": "https://www.pinterest.es/pixeden/",
        "tublr": "https://dribbble.com/pixeden",
        "equipo_trabajo": []
    }
    ```
* Verificar el JSON en la siguiente [página](http://json.parser.online.fr/)


## Servicio - Información de la página

* Necesitamos crear un servicio que lea nuestro JSON y comparta esos datos a lo largo de toda la aplicación.

    ```
    ng g s services/infoPagina --spec false
    
    Option "spec" is deprecated: Use "skipTests" instead.
    CREATE src/app/services/info-pagina.service.ts (139 bytes)
    ```

    El código que se inserta en el servicio creado es:

    ```
    import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root'
    })
    export class InfoPaginaService {

        constructor() { }
    }
    ```

    Gracias a que en las nuevas versiones de Angular se inserta la línea **providedIn: 'root'** ya no es necesario incluir los servicios en **app.module.ts** sección **providers: []**

* Modificamos el **constructor** en **info-pagina.service.ts** para que muestre un mensaje en la consola.

    ```
    constructor() { 
        console.log('Servicio de infoPagina listo...');
    }
    ```

* Vamos a inyectar el servicio en **app.component.ts**

    ```
    export class AppComponent {
        constructor( public infoPaginaService: InfoPaginaService) { }
    }
    ```

* Con solo inyectar el servicio será llamado cuando se recargue la página, si yo navego a otras páginas no se carga nuevamente el servicio, solo cuando se recarga la página. En la consola sale el mensaje:

    `Servicio de infoPagina listo...`

* Pero necesitamos ir más allá, en el **info-pagina.service.ts** necesito leer el JSON y tomar sus propiedades para que puedan ser usadas en las páginas.

* Para hacer lo anterior necesitamos importar un módulo especial **HttpClientModule** en **app.module.ts** 

    ```
    import { HttpClientModule } from '@angular/common/http';
    ...
    imports: [
        ...
        HttpClientModule
    ]
    ```

* En **info-pagina.service.ts** inyectamos el módulo **HttpClient** para poder usarlo.

    ```
    import { HttpClient } from '@angular/common/http';
    ...

    constructor( private http: HttpClient) {
        ...

    ```

* Y metemos el código para leer el JSON, recuperar la respuesta y mostrarla en pantalla:

    ```
    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
        .subscribe ( resp => {
            console.log(resp);
        });
    ```

* El código completo queda así:

    ```
    export class InfoPaginaService {
        constructor( private http: HttpClient) {
            // Leer el archivo JSON
            this.http.get('assets/data/data-pagina.json')
                .subscribe ( resp => {
                    console.log(resp);
                });
        }
    }
    ```

* La salida en la consola es:

    ```
    {titulo: "urku portfolio <sup _ngcontent-ovx-c1=''>tm</sup>", email: "contact@urkuportfolio.com", nombre_corto: "urku portfolio", pagina_autor: "https://www.pixeden.com/html5-website-templates/urku-html5-portfolio-website", facebook: "https://www.facebook.com/pixeden/", …}
    email: "contact@urkuportfolio.com"
    equipo_trabajo: []
    facebook: "https://www.facebook.com/pixeden/"
    instagram: "https://www.pinterest.es/pixeden/"
    nombre_corto: "urku portfolio"
    pagina_autor: "https://www.pixeden.com/html5-website-templates/urku-html5-portfolio-website"
    titulo: "urku portfolio <sup _ngcontent-ovx-c1=''>tm</sup>"
    tublr: "https://dribbble.com/pixeden"
    twitter: "http://twitter.com/pixeden"
    __proto__: Object
    ```

* **NOTA**: Lo que se recupera no es un **JSON** es un **OBJETO**. Por lo que puedo recuperar cualquier propiedad del objeto y mostrarla en consola de la siguiente forma:

    ```
    console.log(resp.twitter); // Marca error tengo que poner resp: any en el subscribe

    // Es mejor usar esta forma
    console.log(resp['twitter']);
    ```

## Crear interfaz para controlar la información de la página

## Usando el servicio para reemplazar información en la página web

## Agregando animaciones a nuestras páginas

##Código fuente de la sección
