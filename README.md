# utn-final-fullstack-tp

Este proyecto está disponible en [https://bpaternostro.site/ecommerce](https://bpaternostro.site/ecommerce).

## Descripción del proyecto

- Se integró el nuevo `backend` con el `frontend` desarrollado en el TP de Frontend.

## Funcionalidades

- Toda la información relacionada con usuarios y productos se obtiene desde el Backend.
- Es posible realizar operaciones de login, logout y registrarse como usuario.
  - Hacer click en el icono de usuario en la barra de navegación.
  - Los usuarios registrados a través del formulario tienen el perfil `customer`. No ven la opción del módulo de admin.
  - Después de iniciar sesión, el nombre del usuario y un saludo aparecen en la barra de navegación.
  - Tras la registración, el usuario debería recibir un correo de confirmación.
  - Al hacer logout con productos en el carrito, este se vacía.
- Existe un módulo de admin que permite ejecutar el ABM de productos.
  - URL: [https://bpaternostro.site/ecommerce/admin](https://bpaternostro.site/ecommerce/admin) (solo para usuarios admin).
- Es posible actualizar el perfil del usuario logueado (Customer o ADMIN).
- El sitio de admin cuenta con un ABM que permite realizar el CRUD de productos.

## Desarrollo

### Frontend

- Se integró el nuevo Backend al marketplace original.
- El proyecto es completamente responsive.
- Todas las funcionalidades del TP original deben seguir funcionando (ahora conectadas con el backend).
- Se almacenan en el localstorage los datos:
  - Token (JWT) -> para verificar la sesión.
  - Nombre de usuario -> para mostrar en pantalla.
- Se verifica cada 10 minutos si la sesion es valida
- Tecnologías: React + Flexbox.

### Backend

- Autenticación:
  - Sesiones mediante JWT con duración de 1 hora.
  - Tipos de perfiles: "customer" y "admin".
  - Solo el usuario "admin" puede acceder al tablero de control (CRUD) del marketplace.
    - Todas las rutas de admin son validadas mediante un middleware
- Persistencia de datos en MongoDB.
- Gestión de autenticación (login/logout), abm de usuarios y productos.
- Estructura del proyecto:
  - `router` -> enrutadores del proyecto.
  - `public/img` -> imágenes del frontend.
  - `middlewares` -> verificación de tokens y perfiles admin.
  - `controllers` -> gestiona las respuestas de los servicios de usuarios y productos.
  - `services` -> gestiona los métodos que interactúan con los modelos de usuarios, productos y envío de correos.
  - `models` -> usuarios / productos / tokens.
    - El modelo de token maneja la lista blanca de tokens disponibles y desactiva los tokens con el logout.
- Tecnologías: Node.js + Express + MongoDB.

### Hosting

- Proveedor: Hostinger (VPS).
- Build: Docker / Docker Compose.
- Gateway: Nginx.

## Aclaraciones

- No es posible realizar el checkout de un carrito de compras.
- Aunque es posible completar el formulario de contacto y enviar el mensaje, este es ficticio.
- No se puede crear un usuario de tipo admin mediante el portal. Para acceder como ADMIN, revisar el correo donde se realizó la entrega.
- El único dato que persiste de la sesión es el TOKEN, para validar que el token no se utilice después del Logout.
