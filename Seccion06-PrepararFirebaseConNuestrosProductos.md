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

## Desplegando los artículos en el home

## URL del Loading que usaremos - SVG

## Agregando un loading a nuestro portafolio

## Código fuente de la sección	
    
