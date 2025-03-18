# 📝 Challenge React NodeJS

## Sobre el proyecto desarrollado

EL proyecto completo disponible y funcional en https://react-nodejs-challenge.vercel.app/

El reto se realizó en su totalidad, acá una breve explicación de lo que se hizo, y qué lenguajes/tecnologías se usaron y por qué:
- Se desarrolló una interfaz en React usando ShadCN y TailwindCSS para ver una lista de productos, y para crear precios especiales para estos artículos basado en el usuario que los visualiza (que tiene la sesión iniciada).
- Ya que no se desarrolló un CRUD para usuarios ni un sistema de autenticación, se simula un caso donde el ID del usuario es "1". (Usuarios, considero que es mejor usar UUIDs).
- Se desarrolló el reto totalmente en TypeScript (Backend y Frontend), para tener un código con menos posibilidad de errores gracias al tipado que nos proporciona el lenguaje.
- El proyecto se desarolló totalmente en inglés (código, variables, comentarios, etc), ya que es un lenguaje universal, y es más cómodo a la hora de desarrollar.
- Se incluye un archivo ``.env.template``, en el cual se añade la URI para la base de datos (En un ambiente de producción o open soure code, este solo representa cómo debería verse el archivo ``.env``).
- El código en general es bastante descriptivo, por lo que no se requiere tanta documentación del mismo.
- Se realizó un despliegue de Backend y Frontend en Vercel.

## Sobre la estructura de los proyectos:
- Frontend: El frontend se desarrolló usando una estructura parecida a NextJS (Y recomendada por ShadCN), donde todos los componentes reutilizables (como botones, input, etc) se guardan en ``src/components/ui``, y otro tipo de componentes más comunes en ``src/components``. El resto de componentes (que contienen la interfaz haciendo uso de los reutilizables) se encuentran en ``src/pages``.

- Backend: El backend se desarrolló usando una estructura parecida a NestJS, donde tratamos de hacer el código lo más modular posible, permitiendo que sea un poco más mantenible a gran escala, y evitando tener archivos con cientos y cientos de líneas. En este caso usamos archivos "index" para exportar y luego importar funciones en otros lugares que sean requeridas.

## Instalación y ejecución del proyecto (Usando Docker) | 🔥 Recomendado

⚠️ Se requiere tener **Docker Destop** instalado, abierto y funcionando.

1. Clonar el repositorio.
2. Abrir una terminal o IDE preferido y dirigirse al directorio del repositorio clonado.
3. Crear un archivo ``.env`` y copiar el contenido de ``.env.template`` en cada proyecto (Frontend y Backend). También se puede cambiar el nombre de ``.env.template`` a ``.env`` directamente.
4. En el proyecto Backend modificar el archivo ``.env`` y establecer en la variable ``MONGO_URI`` el valor ``mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/tienda``.
5. Dentro del repositorio clonado, ejecutar en la terminal el siguiente comando:
    ```bash
    docker-compose up -d --build
    ```
6. Una vez se descarguen las imágenes, y se cree la imagen de los proyectos, ya se puede utiliar la API y el sitio web. Se puede acceder a través de estos enlaces (siempre y cuando no se haya modficiado la variable de entorno NODEJS_SERVER_PORT):
    ```bash
    http://localhost:3000/api
    ```

    ```bash
    http://localhost:5173
    ```

Si ya se finalizaron las pruebas de la API, se pueden eliminar los contenedores usando el siguiente comando:
    ```bash
    docker-compose down
    ```


## Instalación y ejecución del proyecto (Sin Docker)

⚠️ Se requiere tener **PosgresSQL** instalado.

1. Clonar el repositorio.
2. Abrir una terminal o IDE preferido.
3. Crear el archivo ``.env`` y copiar el contenido de ``.env.template`` allí. También se puede cambiar el nombre de ``.env.template`` a ``.env`` directamente.
4. En el proyecto Backend modificar el archivo ``.env`` y establecer en la variable ``MONGO_URI`` el valor ``mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/tienda``.
5. Dirigirse a cada uno de los proyectos (backend y frontend)
6. Instalar las dependencias de cada proyecto:
    ```bash
    npm install
    ```

7. Ejecutar los proyectos en modo desarrollo para realizarlo con mayor agilidad.
    ```bash
    npm run dev
    ```
8. Si se desea, se puede construir los archivos .js usando ``npm run build``, simulando un "despliegue a producción".

9. Una vez realizados los pasos anteriores, ya se puede acceder a los proyectos. Se puede acceder a través de este enlace (siempre y cuando no se haya modficiado la variable de entorno PORT):
    ```bash
    http://localhost:3000/api
    ```

    ```bash
    http://localhost:5173
    ```


---

Con esto finalizo el README.md del repositorio, ¡muchas gracias!

Juan Fernando Cataño Posada.