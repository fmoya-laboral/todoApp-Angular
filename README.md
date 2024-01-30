# Todo App 📆

## Contenido
- [¡Bienvenido!](#bienvenido)
- [Requisitos Previos](#requisitos-previos)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Buenas Prácticas](#buenas-prácticas)
- [Contribuciones](#contribuciones)

<a name="bienvenido"></a>
## 🚀 ¡Bienvenido!

¡Bienvenido al proyecto "Todo App"! Esta aplicación está diseñada para ayudarte a gestionar tus tareas diarias de manera eficiente. Desarrollada con Angular 14 y Firebase, te permite añadir, editar y marcar tus tareas como completadas o pendientes.

## 🧑‍💻 Usuario de Prueba

Para acceder a la aplicación, puedes utilizar el siguiente usuario de prueba:

- Email: pruebatodo@gmail.com
- Contraseña: 123456

Este usuario te permitirá explorar todas las funcionalidades de la aplicación sin necesidad de crear una cuenta nueva.
<a name="requisitos-previos"></a>
## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado Node.js en tu sistema. Esta aplicación ha sido desarrollada y probada con la siguiente configuración:

- Node.js: v16.14.2
- Angular CLI: 14.3.0
- Firebase Tools: 12.0.1 (para funciones relacionadas con backend)

Puedes verificar tu versión de Node.js ejecutando `node -v` en tu terminal.
<a name="configuración-del-entorno-de-desarrollo"></a>
## 🔧 Configuración del Entorno de Desarrollo

Para configurar tu entorno de desarrollo y trabajar en este proyecto, sigue estos pasos:

1. **Clona el repositorio:**

```
git clone https://github.com/fmoya-laboral/todoApp-Angular.git
```

2. **Instala las dependencias:**
   Navega al directorio del proyecto y ejecuta:

```
npm install
```

3. **Configura Firebase:**
   Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Firebase.

4. **Ejecuta la aplicación:**

```
ng serve
```

Abre tu navegador en `http://localhost:4200` para ver la aplicación en ejecución.

<a name="contribuciones"></a>
## 🤝 Contribuciones

Si deseas contribuir al proyecto, por favor, revisa las guías de contribución y envía tus pull requests. Todas las contribuciones son bienvenidas.

<a name="buenas-prácticas"></a>
## Buenas Prácticas ✨

Al contribuir a este proyecto, te animamos a seguir algunas buenas prácticas para mantener un código limpio y una colaboración efectiva. A continuación, se presentan algunas recomendaciones:

### 1. Comentarios y Documentación 📚

Mantén el código bien comentado y documentado. Describe la funcionalidad de las funciones, métodos y componentes para que otros colaboradores puedan comprender fácilmente el propósito de tu código.

### 2. Convenciones de Nombres 📝

Sigue las convenciones de nombres utilizadas en el proyecto. Utiliza nombres descriptivos para variables, funciones y componentes. Siempre que sea posible, sigue las prácticas de nomenclatura establecidas en el proyecto.

### 3. Pruebas Unitarias 🧪

Siempre que escribas código nuevo, considera agregar pruebas unitarias para validar su funcionalidad. Esto ayuda a prevenir errores y asegura que las futuras actualizaciones no rompan el código existente.

### 4. Mantén la Limpieza 🧹

Elimina el código no utilizado o innecesario. Evita la duplicación de código. Asegúrate de que el código sea eficiente y fácil de mantener.

## Antes de Hacer el Commit 🔧

Antes de realizar un commit en el repositorio, es recomendable ejecutar ciertos comandos para asegurarte de que el código esté formateado y listo para la implementación. A continuación, se detallan los comandos que puedes ejecutar:

### 1. **Prettier** 🎨:
Antes de hacer un commit, puedes formatear automáticamente los archivos de código fuente utilizando Prettier. Ejecuta el siguiente comando para formatear los archivos TypeScript:

```bash
npm run prettier:write
```

## 📚 Documentación y Guías

- **Angular:** https://angular.io/
- **Firebase:** https://firebase.google.com/docs
- **AngularFire:** https://github.com/angular/angularfire
