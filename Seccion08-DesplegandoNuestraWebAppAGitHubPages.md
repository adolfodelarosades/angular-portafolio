#Desplegando nuestra WebApp a GitHub Pages

## Introducción a lo que veremos en la sección

:+1:

## Probando nuestra app en pre-producción

* Generar la aplicación para **preproducción** o **producción**. Usamos el siguiente comando estando en la carpeta que contiene el proyecto.

    `ng build --prod`

    Al ejecutar este comando:

    * Se genera una carpeta **dist/portafolio** en nuestro proyecto, con los siguientes archivos:

        ```
        3rdpartylicenses.txt                    // Licencias
        favicon.ico                             // Favicon
        index.html                              // 
        main-es5.7faa192af3cc40704828.js
        main-es2015.dfb21192c723efc423d5.js
        polyfills-es5.943113ac054b16d954ae.js   // Optimizaciones con navegadores
        polyfills-es2015.27661dfa98f6332c27dc.js
        runtime-es5.741402d1d47331ce975c.js
        runtime-es2015.858f8dd898b75fe86926.js
        styles.93068e0f8ba2561aeeca.css         // Los estilos de la página
        assets                                  // Carpeta assets tal cual
            css
            data
            img
            js
            productos
        ```

    Este es nuestro código optimizado listo para subir a producción.

    Si intentamos cargar el archivo **index.html** en algún navegador no lograremos ver nada ya que esta usando el protocolo **file** en lugar del **http**, solo se puede probar en un servidor.

* Instalar un servidor de prueba de **preproduccion**. Vamos a la siguiente página:

    [http-server](https://www.npmjs.com/package/http-server)

    En la página vemos que la instrucción para instalar el servidor es:

    `npm i -g http-server` 

    Este comando me permite crear un servidor HTTP (localhost) para hacer pruebas de archivos html, css y js.

* Arrancar el servidor de prueba.

    * Nos colocamos en la carpeta **dist/portafolio** 

    * Ejecutamos el comando:

        `http-server -o`

    * Se levanta nuestra página en http://127.0.0.1:8080

        En particular me salió el siguiente error con **http-serve**, tuve que cargarlo en mi localhost de MEAN y allí fue bien.

        ```
        Error de contenido dañado

        El sitio en http://127.0.0.1:8080/ ha experimentado una violación de protocolo de red que no puede solventarse.

        La página que está intentando ver no se puede mostrar porque se ha detectado un error en la transmisión de datos.

            Contacte con los propietarios del sitio web para informarles de este problema.
        ```

* Una vez que hemos probado nuestro proyecto en **preproduccion** vamos a prepararla para **GitHub** haciendo lo siguiente:

    * Coger la carpeta portafolio y pegarla en la raíz de proyecto, cambiándole el nombre a **docs**, es el nombre que solicita **GitHub**.

    * Borrar la carpera **dist**

## Subiendo los archivos a GitHub

## Código fuente de la sección


