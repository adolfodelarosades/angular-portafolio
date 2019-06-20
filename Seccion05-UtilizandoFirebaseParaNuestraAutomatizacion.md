# Utilizando Firebase para nuestra automatización

## Introducción a la sección

:+1:

## Creando nuestra base de datos en Firebase

Firebase es la nueva plataforma de desarrollo móvil que permite desarrollar apps multiplataforma (Android, iOS y web).

Tiene varias funcionalidades entre ellas una BD tipo MongoDB, una BD de objetos, también ofrece servicios REST.

Ir a [firebase](https://firebase.google.com/)

1. Debemos crearnos una cuenta o si ya la tenemos iniciamos sesión, vamos a la consola.

2. Dar clic en **Nuevo proyecto**

    * **Nombre del proyecto**: angular-portafolio
    * **País**: España
    * Aceptamos condiciones
    * Presionar **Crear proyecto**
    * Presionar **continuar**

3. Seleccionamos **Database**

    Existen varias opciones entre ellas:

    * **Cloud Firestore** La nueva generación de Realtime Database incorpora consultas y un escalado automático más potentes
    * **Realtime Database** Base de datos original de Firebase. Al igual que Cloud Firestore, admite la sincronización de datos en tiempo real.

    Vamos a seleccionar esta segunda pulsando en **Crear base de datos**, aparecen dos opciones:

    * Empezar con el **modo de bloqueo**
    * Empezar con el **modo de prueba**

    Seleccionamos la segunda opción con la que "Cualquier usuario que tenga la referencia de tu base de datos podrá realizar operaciones de lectura o escritura en ella"

4. Aparece la pantalla de la **Database**

    * En la pestaña **Reglas** cambiamos **write: false**, de esta manera todos pueden leer, pero solo yo escribir.
    * Presiono **Publicar**

5. En la pestaña **Datos** voy a ingresar los siguientes campos:

    ```
    angular-portafolio-52ee6: null
        Nombre  equipo
            Nombre  0
                Nombre  nombre      Valor   Robert T. Williams
                Nombre  puesto      Valor   Graphic Designer
                Nombre  descripcion Valor   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                Nombre  twitter     Valor   @robertwilliams
    ```

    Presionamos **Añadir**. Me añade ese elemento.

    Presionamos **+** en el equipo y repetimos el proceso poniendo 1 y los demas datos.

    Al final tendremos algo como esto:

    ```
    angular-portafolio-52ee6
        equipo
            0
                descripcion: "Lorem ipsum dolor sit amet, consectetur adipisc..."
                nombre: "Robert T. Williams"
                puesto: "Graphic Designer"
                twitter: "@robertwilliams"
            1
                descripcion: "Ullamco laboris nisi ut aliquip ex ea commodo c..."
                nombre: "Angelina B. Widow"
                puesto: "Founder / CEO"
                twitter: "@angelinawidow"
            2
                descripcion: "Excepteur sint occaecat cupidatat non proident,..."
                nombre: "Patrick Anderson"
                puesto: "Art Director"
                twitter: "@patrickanderson"
    ```

5. Si presionamos en **equipo** nos aparece el siguiente URL:

    `https://angular-portafolio-52ee6.firebaseio.com/equipo`

    Al cual al final le agregamos .json

    `https://angular-portafolio-52ee6.firebaseio.com/equipo.json`

    Al meter este enlace en un navegador me regresa un JSON

    ```json
    // 20190619214830
    // https://angular-portafolio-52ee6.firebaseio.com/equipo.json

    [
    {
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        "nombre": "Robert T. Williams",
        "puesto": "Graphic Designer",
        "twitter": "@robertwilliams"
    },
    {
        "descripcion": "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        "nombre": "Angelina B. Widow",
        "puesto": "Founder / CEO",
        "twitter": "@angelinawidow"
    },
    {
        "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "nombre": "Patrick Anderson",
        "puesto": "Art Director",
        "twitter": "@patrickanderson"
    }
    ]
    ```

6. Almacenar las imágenes en el **Storage** 

    El **Storage** almacena y recupera los archivos generados por el usuario (como fotos, vídeos y archivos de audio) sin necesidad de utilizar código de servidor. 

    Presionamos en **Empezar**

    En las reglas de seguridad le damos **Entendido**

    Cambio las reglas a:

    `allow read: if true`

7. En la pestaña **Archivos** presiono el botón **Subir archivo**

    Selecciono las 3 fotos de los colaboradores.

8. Cada archivo tiene un URL único que me permite cargar la imagen, para ver ese URL presiono en el **nombre de la imagen** y **ubicación del archivo** y doy clic en **URL de descarga** así copio el URL, si cargo ese URL en un navegador veré la imagen.

    ```
    https://firebasestorage.googleapis.com/v0/b/angular-portafolio-52ee6.appspot.com/o/team-1.jpg?alt=media&token=76c2469f-e516-4d54-900e-7b2063f3e401
    
    https://firebasestorage.googleapis.com/v0/b/angular-portafolio-52ee6.appspot.com/o/team-2.jpg?alt=media&token=521854fc-936e-4dc2-8585-784ef41e674b

    https://firebasestorage.googleapis.com/v0/b/angular-portafolio-52ee6.appspot.com/o/team-3.jpg?alt=media&token=34518991-e20f-4964-aad9-3315de5687af

    ```

9. Debo añadir un campo URL a cada registro metido y ponerle como valor el URL en la Database.

10. Para ver el JSON final pinche en:

    [JSON](https://angular-portafolio-52ee6.firebaseio.com/equipo.json)
    

## Carga de la información de Firebase a nuestra página

* Vamos a leer el servicio REST de Firebase para recuperar los datos del JSON y pintarlos en la consola. Para que el constructor no este muy cargado realizaremos una función por cada servicio que leamos y luego solo llamaremos esas funciones en el constructor.

    ```
    info: InfoPaginaInterface = {};
    equipo: any[] = [];

    constructor( private http: HttpClient) {
        this.cargarInfo();
        this.cargarEquipo();
    }

    private cargarInfo(){
        // Leer el archivo JSON
        this.http.get('assets/data/data-pagina.json')
        .subscribe ( (resp: InfoPaginaInterface) => {
            this.info = resp;
        });
    }

    private cargarEquipo(){
        // Leer el API REST FIREBASE
        this.http.get('https://angular-portafolio-52ee6.firebaseio.com/equipo.json')
        .subscribe ( (resp: any[]) => {
            this.equipo = resp;
            console.log(resp);
        });
    }

    (3) [{…}, {…}, {…}]
        0: {descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", nombre: "Robert T. Williams", puesto: "Graphic Designer", twitter: "@robertwilliams", url: "https://firebasestorage.googleapis.com/v0/b/angula…=media&token=76c2469f-e516-4d54-900e-7b2063f3e401"}
        1: {descripcion: "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.", nombre: "Angelina B. Widow", puesto: "Founder / CEO", twitter: "@angelinawidow", url: "https://firebasestorage.googleapis.com/v0/b/angula…=media&token=521854fc-936e-4dc2-8585-784ef41e674b"}
        2: {descripcion: "Excepteur sint occaecat cupidatat non proident, su… qui officia deserunt mollit anim id est laborum.", nombre: "Patrick Anderson", puesto: "Art Director", twitter: "@patrickanderson", url: "https://firebasestorage.googleapis.com/v0/b/angula…=media&token=34518991-e20f-4964-aad9-3315de5687af"}
        length: 3
        __proto__: Array(0)
    ```

## Mostrando la información de Firebase en el HTML

