# Preparar Firebase con nuestros productos

## Introducción a la sección

:+1:

## Material de la sección
    
 * Descargar el material adjunto de esta sección **Material de Firebase.zip**

## Cargando información a Firebase

Antes de cargar información en Firebase vamos a ver como se respalda lo que ya tenemos hasta el momento (equipo).

1. Abrir **Firebase** en la sección **Database**, veremos lo siguiente:

    ```
    https://angular-portafolio-52ee6.firebaseio.com/                        
    
    angular-portafolio-52ee6
        + equipo
    ```

    Como podemos apreciar tenemos solo la entidad **equipo** con 3 elementos

2. Abrir los 3 puntos de la derecha y tenemos las siguientes opciones:

    ```
    Exportar JSON
    Importar JSON
    ....
    ```

3. Seleccionamos **Exportar JSON** para hacer un respaldo de nuestra BD.

    Se descarga el archivo **angular-portafolio-52ee6-export.json**

4. Importar información a la BD. Dentro del material adjunto tenemos dos archivos JSON:

    * **productos.json**
    * **productos_idx.json**

    Estos archivos ya contienen toda la información en formato JSON y es lo que incluiremos en la BD

5. Importar

    * En el enlace superior que tenemos:

        `https://angular-portafolio-52ee6.firebaseio.com/`

    * Añadimos **productos** y presionamos Enter

        `https://angular-portafolio-52ee6.firebaseio.com/productos`

    * Esto crea un nodo temporal **productos** que no esta grabado todavía (si regresamos ya lo perdemos), tocamos los 3 puntos

    * Seleccionamos **Importar JSON**

    * Seleccionamos el archivo **productos.json**

    * Se importan todos los productos

        ```
        + productos
            + prod-1
            + prod-10
            + prod-11
            + prod-12
            + prod-13
            + prod-14
            + prod-15
            + prod-2
            + prod-3
            + prod-4
            + prod-5
            + prod-6
            + prod-7
            + prod-8
            + prod-9
        ``` 
    * Realizamos el mismo proceso para **productos_idx**

    * Al finalizar tenemos 3 entidades o tablas

        ``` 
        angular-portafolio-52ee6
            + equipo
            + productos
            + productos_idx
        ``` 
    
    * Los enlaces para ver los JSON son

        * [equipo](https://angular-portafolio-52ee6.firebaseio.com/equipo.json)
        * [productos](https://angular-portafolio-52ee6.firebaseio.com/productos.json)
        * [productos_idx](https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json)

## Creando el servicio de productos

1. Vamos a generar el servicio productos

    ```
    ng g s services/productos --skipTests
    CREATE src/app/services/productos.service.ts (138 bytes)
    ```

2. En el constructor del servicio **productos.service.ts** inyectamos HttpClient

    `constructor( private http: HttpClient) { }`

3. Creamos un método **cargarProductos** para recuperar los **productos_idx**

    ```
    private cargarProductos() {
        this.http.get('https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any[]) => { 
            console.log(resp);
        });
    }
    ```

4. Llamamos este método desde el **constructor**

    ```
    constructor( private http: HttpClient) {
        this.cargarProductos();
    }
    ```
5. Hasta aquí nadie esta llamando al servicio por lo que en la consola no se pinta nada. ¿ Desde donde tengo que llamar al servicio?

    * Podemos cargarlo desde el **app.component.ts**
    * Podemos cargarlo desde el **portafolio.component.ts**

    Ya depende de la lógica de cada uno.

6. En este caso lo cargaremos desde **app.component.ts**, por lo que inyectamos el servicio productos en el constructor:

    ```
    constructor( public infoPaginaService: InfoPaginaService,
               public productosService: ProductosService) { }
    ```

7. Con esto es suficiente para que ya se llame al servicio **ProductosService**, por lo que ya se debe ver en la consola la respuesta.

    ```
    (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

    0: {categoria: "papeleria", cod: "prod-1", titulo: "Diferentes papeles", url: "project-1.jpg"}
    1: {categoria: "accesorios", cod: "prod-2", titulo: "iPad Cover", url: "project-2"}
    2: {categoria: "libros", cod: "prod-3", titulo: "Libro con muchas letras", url: "project-3"}
    3: {categoria: "comida", cod: "prod-4", titulo: "Café caliente", url: "project-4"}
    4: {categoria: "papeleria", cod: "prod-5", titulo: "Tarjetas de Presentación", url: "project-5"}
    5: {categoria: "ropa", cod: "prod-6", titulo: "Camisetas con diseños", url: "project-6"}
    6: {categoria: "accesorios", cod: "prod-7", titulo: "Lapiceros", url: "project-7"}
    7: {categoria: "madera", cod: "prod-8", titulo: "Pedazos de madera", url: "project-8"}
    8: {categoria: "accesorios", cod: "prod-9", titulo: "Bolsas", url: "project-9"}
    9: {categoria: "libros", cod: "prod-10", titulo: "Hojas con manchas", url: "project-10"}
    10: {categoria: "cajas", cod: "prod-11", titulo: "Cajas para cosas", url: "project-11"}
    11: {categoria: "papeleria", cod: "prod-12", titulo: "Tarjetas de presentación Blancas y Negras", url: "project-12"}
    12: {categoria: "tecnologia", cod: "prod-13", titulo: "Diseño de Apps", url: "project-13"}
    13: {categoria: "papeleria", cod: "prod-14", titulo: "Papeles sucios", url: "project-14"}
    14: {categoria: "ropa", cod: "prod-15", titulo: "Camisetas usadas", url: "project-15"}
    length: 15
    __proto__: Array(0)
    ```

## Crear la Interface de **productos_idx**

1. Copiar en el clipboard todo el JSON de productos_idx, en el enlace:

    `https://angular-portafolio-52ee6.firebaseio.com/productos_idx.json` 

2. Abrimos un nuevo archivo en VSC.

3. Presionamos **Ctrl + Shift + P**

4. Buscar y seleccionar JSON to TS

5. Se crea la interface

    ```
    interface RootObject {
        categoria: string;
        cod: string;
        titulo: string;
        url: string;
    }
    ```

    Le cambiamos el nombre para que quede así:

    ```
    export interface ProductoInterface {    
        categoria: string;
        cod: string;
        titulo: string;
        url: string;
    }
    ```

6. Salvamos el archivo como **interfaces/producto.iterface.ts**

7. En **productos.service.ts** indico que mi **resp** es del tipo **ProductoInterface**

    ```
    ...
    .subscribe( (resp: ProductoInterface[]) => {
    ...
    }
    ```

## Desplegando los artículos en el home

## URL del Loading que usaremos - SVG

## Agregando un loading a nuestro portafolio

## Código fuente de la sección	
    
