# Estructuras HTML a componentes de Angular

## Introducción a la sección

:+1:

## Descarga del tema que usaremos de ejemplo URKU-Portfolio-Template-HTML5-PIXEDEN

Ir a [Pixelden Urku](https://www.pixeden.com/html5-website-templates/urku-html5-portfolio-website)

## Información del template a usar URKU-Portfolio-Template-HTML5-PIXEDEN

Ir a [Pixelden Urku](https://www.pixeden.com/html5-website-templates/urku-html5-portfolio-website)

## Iniciando el proyecto de Angular

1. Crear proyecto angular

    `ng new portafolio`

2. Arrancar proyecto

    `cd portafolio`

    `ng serve -o`

3. Cargar proyecto en el navegador

    `http://localhost:4200/`

4. Configurar Git en el proyecto

    `git init`

5. Crear repositorio remoto

    Ir a [GitHub](https://github.com) y crear el repositorio **angular-portafolio**

6. Subir nuestro repositorio local al remoto

    `git remote add origin https://github.com/adolfodelarosades/angular-portafolio.git`

    `git push -u origin master`

7. Asociar un Tag a la versión inicial y subirla al Remoto

    `git tag -a v0.0.0 -m “Version inicial”`

    `git push --tags`


## Estructura HTML básica a nuestro proyecto de Angular

* Copiar el contenido del directorio **assets** de la plantilla descargada al directorio **assets** de nuestro proyecto.

* En el archivo **index.html** modificar los estilos para hacer referencia a los copiados en **assets**.

    `<link rel="icon" type="image/svg+xml" href="assets/img/urku-ico.svg">`

    `<link rel="stylesheet" href="assets/css/aurora-pack.min.css">`

    `<link rel="stylesheet" href="assets/css/aurora-theme-base.min.css">`

    `<link rel="stylesheet" href="assets/css/urku.css">`

* Recargar la página para apreciar los cambios en el estilo.

## Componente del encabezado

1. Creación del primer componente header

    `ng g c shared/header --spec=false`

    * **g** generate
    * **c** component
    * **shared/header** carpeta/nombre_componente
    * **--spec=false** no crear la parte de pruebas unitarias o pruebas de integración
    * Me indica lo siguiente:

    `CREATE src/app/shared/header/header.component.html (25 bytes)`

    `CREATE src/app/shared/header/header.component.ts (269 bytes)`

    `CREATE src/app/shared/header/header.component.css (0 bytes)`

    `UPDATE src/app/app.module.ts (403 bytes)`

2. Modificar contenido del **index.html**

    Añadir clase en el body `<body class="top-fixed">`

3. Modificar contenido del **header.component.html**

    * Insertar el código de la sección **header** del archivo **portafolio-masonry.html** de la plantilla

4. Modificar contenido de **app.component.html**

    * Hacer referencia al nuevo componente:

        `<app-header></app-header>`

        `<h1>Hola Mundo</h1>`

## Componente del pie de la página

1. Creación del componente footer

    `ng g c shared/footer --spec=false`

2. Modificar contenido del **footer.component.html**

    * Insertar el código de la sección **footer** del archivo **portafolio-masonry.html** de la plantilla

3. Modificar contenido de **app.component.html**

    * Hacer referencia al nuevo componente:

        `<app-header></app-header>`

        `<br><br><br><br><br><br>`

        `<h1>Hola Mundo</h1>`

        `<app-footer></app-footer>`

4. Crear propiedad **anio** en **footer.component.ts**

    `anio: number = new Date().getFullYear();`

5. Usar esa propiedad **anio** en **footer.component.html** para hacer el año dinámico.

    `{{ anio }}`

## Componente del cuerpo de la página

1. Creación del componente **portafolio** en el directorio **pages**

    `ng g c pages/portafolio --spec=false`

2. Modificar contenido del **portafolio.component.html**

    * Insertar el código de la sección **section** del archivo **portafolio-masonry.html** de la plantilla

3. Modificar contenido de **app.component.html**

    * Hacer referencia al nuevo componente:

        `<app-header></app-header>`

        `<section class="ae-container-fluid rk-main">`

        `<app-portafolio></app-portafolio>`

        `</section>`

        `<app-footer></app-footer>`


## GIT - Guardando el estado de nuestro proyecto

:+1:

## Código fuente de la sección portafolio.zip

* Creamos un Tag para poder descargar el proyecto tal cual al final de la sección 2.

    `git tag -a v0.2.0 -m “Fin sección 2”`

    `git push --tags`

