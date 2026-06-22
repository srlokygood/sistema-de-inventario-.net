# Prueba Técnica - Backend .NET + Supabase

API REST desarrollada en ASP.NET Core 8 que permite autenticación mediante JWT y consulta de datos almacenados en Supabase (PostgreSQL).

## Tecnologías utilizadas

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL (Supabase)
- JWT Bearer Authentication
- Swagger
- BCrypt

---

Verificar instalación:

```bash
dotnet --version

clonar repositorio

git clone https://github.com/srlokygood/sistema-de-inventario-.net

cd backend

y para restaurar a la dependencia

dotnet restore

comandos para establecer los parametros necesarios

dotnet user-secrets set "JwtSettings:SecretKey" "ClaveULtraSecretaQueNadieDEberiaSaber" 
dotnet user-secrets set "ConnectionStrings:SupabaseConnection" "Host=aws-1-us-west-2.pooler.supabase.com;Port=5432;Database=postgres;Username=postgres.bvurglvutjbzsirzeljc;Password=Competity2026*;SSL Mode=Require;Trust Server Certificate=true"
dotnet user-secrets set "AdminCredentials:Username" "Admin" 
dotnet user-secrets set "AdminCredentials:Password" "1234" 

dotnet run

# Sistema de Inventario - Frontend Angular

## Descripción

Aplicación desarrollada en Angular para la gestión de productos e inventario mediante consumo de una API REST protegida con JWT.

---

## Tecnologías

- Angular
- TypeScript
- RxJS
- Reactive Forms
- Bootstrap
- JWT Authentication

---

## Requisitos

Antes de iniciar, asegúrate de tener instalado:

- Node.js 18+
- NPM 9+
- Angular CLI

Verificar instalación:

```bash
node -v
npm -v
ng version
```

Instalar Angular CLI:

```bash
npm install -g @angular/cli
```

---

## Instalación

### Clonar repositorio
Ingresar al proyecto:

```bash
cd frontend
```

### Instalar dependencias

```bash
npm install
```

---

## Configuración

Configurar la URL del backend en:

```text
src/environments/environment.ts
```

Ejemplo:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

---

## Ejecución

Iniciar servidor de desarrollo:

```bash
ng serve
```

Abrir navegador:

```text
http://localhost:4200
```

## Autenticación

La aplicación utiliza JWT para autenticar usuarios.

El token se almacena en el navegador:

```typescript
localStorage.setItem('token', token);
```

Las peticiones protegidas envían automáticamente:

```http
Authorization: Bearer TOKEN
```

---

## Compilación para Producción

```bash
ng build --configuration production
```

Los archivos compilados se generan en:

```text
dist/
```

---

### Ejecutar proyecto

```bash
npm start
```

### Servidor de desarrollo

```bash
ng serve
```

### Ejecutar pruebas

```bash
ng test
```

---

### Error 401 Unauthorized

Verificar:

- Token válido.
- Usuario autenticado.
- Header Authorization enviado.

### Error CORS

Verificar configuración CORS en el backend.

### Error HttpErrorResponse

Revisar:

- URL del endpoint.
- Datos enviados.
- Token JWT.
- Estado del backend.

---

## Autor

**Jair Forero**

Desarrollador Full Stack


## Prueba de la Aplicación

### Inicio de Sesión

Para acceder al sistema utilice las siguientes credenciales de prueba:

**Usuario:** Admin  
**Contraseña:** 1234

Una vez autenticado, el sistema mostrará el listado de productos registrados en la base de datos.

### Registro de Movimientos

En la pantalla principal encontrará la opción para registrar movimientos de inventario. Al seleccionar esta opción se abrirá una ventana con los siguientes campos:

- ID del producto
- Tipo de movimiento (Entrada o Salida)
- Cantidad

### Observaciones

Debido a limitaciones de tiempo durante el desarrollo de la prueba técnica, la integración del formulario modal de movimientos en el frontend no quedó completamente funcional.

Sin embargo, la funcionalidad fue desarrollada y validada correctamente en el backend. El endpoint encargado de registrar movimientos puede ser probado mediante herramientas como Postman, donde procesa las solicitudes y actualiza la información en la base de datos de forma satisfactoria.

#### Ejemplo de petición

obtener e bearer token en login
http://localhost:5000/auth/login
{
  "username": "Admin",
  "password": "1234"
}




http://localhost:5000/productos/movimiento
```json
{
  "productoId": 1,
  "tipo": "Salida",
  "cantidad": 10
}
