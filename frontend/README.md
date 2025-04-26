# 🐾 Patas Pirque — Frontend

¡Bienvenido al frontend de **Patas Pirque**! Esta es la interfaz de usuario de nuestra plataforma.

## 🧰 Tecnologías utilizadas

| Logo | Tecnología     | Descripción                                                                 |
|------|----------------|-----------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="30"/> | **React**         | Biblioteca de JavaScript para construir interfaces de usuario.           |
| <img src="https://vitejs.dev/logo.svg" width="30"/> | **Vite**          | Herramienta rápida de desarrollo frontend.                               |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="30"/> | **JavaScript**    | Lenguaje de programación para la web.                                     |
|<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="30"/> | **Tailwind CSS**  | Framework de CSS utilitario para diseñar directamente en el HTML.       |


## 🗂 Estructura del Proyecto

El proyecto sigue una estructura organizada para separar las diferentes partes de la aplicación frontend. A continuación se describe la estructura de carpetas dentro de la carpeta `frontend`:

### 📁 `frontend/`
La carpeta principal donde se encuentra el código fuente del frontend de la aplicación.

#### 📁 `src/`
Contiene todos los archivos de código fuente necesarios para la aplicación.

- **📁 `components/`**: 
  - Aquí se almacenan los componentes reutilizables de la aplicación, como botones, formularios, y otros elementos UI que pueden ser usados en varias vistas.
  
- **📁 `layout/`**: 
  - Contiene los componentes y estructuras de layout, como el encabezado, pie de página, o cualquier diseño estructural que sea común en varias vistas de la aplicación.
  
- **📁 `views/`**:
  - Dentro de esta carpeta se encuentran las vistas o páginas completas de la aplicación. Cada vista representa una pantalla o una sección distinta de la app, por ejemplo: `Home`, `Profile`, etc.

Esta organización facilita el desarrollo y mantenimiento, permitiendo que los componentes sean reutilizables y el código sea fácilmente escalable.

## 🚀 Comenzando

Sigue estos pasos para levantar el servidor de desarrollo:

### 1️⃣ Clona el repositorio
```bash
git clone URL repositorio
```
### 2️⃣ Accede a la carpeta del frontend
```bash
cd patas-pirque/frontend
```
### 3️⃣ Instala las dependencias
```bash
npm install
```
### 4️⃣ Inicia el servidor de desarrollo
```bash
npm run dev
```

## Despliegue del Frontend en Vercel

Este proyecto está desplegado en [Vercel](https://vercel.com), una plataforma de despliegue y hosting para aplicaciones web estáticas y dinámicas.

### Pasos para el despliegue

1. **Crear una cuenta en Vercel**:
   - Dirígete a [Vercel](https://vercel.com) y crea una cuenta si no tienes una.
   - Puedes registrarte con tu cuenta de GitHub, GitLab o con tu correo electrónico.

2. **Conectar el repositorio de GitHub a Vercel**:
   - Inicia sesión en Vercel y haz clic en **New Project**.
   - Selecciona la opción de conectar con tu repositorio de **GitHub**.
   - Vercel pedirá acceso a tus repositorios. Asegúrate de otorgar los permisos necesarios para acceder al repositorio que contiene tu proyecto.
   
3. **Seleccionar el proyecto**:
   - Una vez conectado tu cuenta de GitHub, selecciona el repositorio de tu proyecto.
   - Vercel automáticamente detectará el tipo de proyecto (por ejemplo, un proyecto con React, Next.js, etc.) y ajustará la configuración de despliegue en función de esto.

4. **Configuración de ramas**:
   - Si estás usando la rama **`main`**, asegúrate de que Vercel esté configurado para desplegar desde esa rama. Rama de producción.
   
5. **Comandos de Build**:
   - **Build Command**: En el campo "Build Command", generalmente Vercel detecta el comando adecuado automáticamente para frameworks comunes (por ejemplo, `npm run build` para proyectos de React).
   - **Publish Directory**: En el campo "Publish Directory", asegúrate de que esté configurado como la carpeta que contiene los archivos estáticos de producción. Para proyectos de React, por ejemplo, será `frontend/build` o `frontend/dist` dependiendo de la configuración de tu proyecto.

6. **Desplegar el proyecto**:
   - Haz clic en **Deploy**. Vercel comenzará a crear el build de tu proyecto y lo desplegará en el dominio asignado (por ejemplo, `your-project.vercel.app`).
   - Si todo va bien, el sitio estará en línea y accesible a través de este subdominio de Vercel.
   
7. **Personalización del dominio (opcional)**:
   - Si deseas utilizar un dominio personalizado (por ejemplo, `www.tusitio.com`), puedes añadirlo en la sección **Domains** en la configuración de Vercel.

### Archivos importantes

- **`package.json`**: Contiene los scripts de `build` y otras configuraciones importantes para el despliegue.
  
### URL del proyecto

Una vez desplegado, tu sitio estará disponible en una URL proporcionada por Vercel, por ejemplo:

- **`https://your-project.vercel.app`**

Y si configuraste un dominio personalizado, estará disponible en:

- **`https://www.tusitio.com`** (Dependiendo de la configuración del dominio).

### Notas adicionales

- Vercel realiza despliegues automáticos cada vez que realices un `push` a tu repositorio en GitHub.
- Puedes monitorear el estado de los despliegues, revisar los registros de la consola y obtener detalles sobre el estado de la construcción y el despliegue desde el panel de control de Vercel.

¡Con estos pasos, el Frontend estará desplegado y funcionando en Vercel!
