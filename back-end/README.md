# Inventario API

API REST en .NET 9 con autenticación JWT Bearer y persistencia en PostgreSQL (Supabase) vía Entity Framework Core.

## Requisitos previos

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- Una base de datos PostgreSQL accesible (Supabase u otra instancia Postgres). El proyecto espera una tabla `productos` con columnas `id`, `nombre`, `cantidad`.

## Configuración (requerido antes de correr)

El proyecto usa [User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) para mantener credenciales fuera del código fuente — por eso no hay password ni connection string en `appsettings.json`. Antes de ejecutar, configura lo siguiente desde la carpeta del proyecto:

```bash
dotnet user-secrets init

dotnet user-secrets set "ConnectionStrings:SupabaseConnection" "<ver credenciales provistas aparte>"

dotnet user-secrets set "AdminCredentials:Username" "admin"
dotnet user-secrets set "AdminCredentials:Password" "<ver credenciales provistas aparte>"

dotnet user-secrets set "JwtSettings:SecretKey" "<una-cadena-aleatoria-de-al-menos-32-caracteres>"
```

> **Nota:** la connection string y el password de admin para esta prueba técnica se envían por separado (no van en el repositorio). Esta base de datos es exclusivamente de prueba, sin datos sensibles.

Puedes generar una SecretKey aleatoria con:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## Ejecutar

```bash
dotnet restore
dotnet run
```

La API queda disponible en `https://localhost:<puerto>` (el puerto exacto se imprime en consola al iniciar). La documentación interactiva está en `/swagger`.

## Endpoints

| Método | Ruta                    | Descripción                                  | Requiere JWT |
|--------|-------------------------|-----------------------------------------------|--------------|
| POST   | `/auth/login`            | Autenticación, devuelve un token JWT          | No           |
| POST   | `/productos/movimiento`  | Registra entrada o salida de un producto      | Sí           |
| GET    | `/productos/inventario`  | Consulta el estado actual del inventario      | Sí           |

### Flujo de prueba

1. `POST /auth/login` con el body:
   ```json
   { "username": "admin", "password": "<el-password-que-configuraste>" }
   ```
2. Copia el `token` de la respuesta.
3. En Swagger, clic en **Authorize** y pega `Bearer <token>`.
4. Prueba `GET /productos/inventario` y `POST /productos/movimiento`.

## Notas de diseño

- Las credenciales de autenticación son fijas (no hay tabla de usuarios ni registro), por requerimiento del alcance del proyecto.
- El token JWT se firma con HMAC-SHA256 y expira según `JwtSettings:ExpiresInMinutes` (60 min por defecto).
- La conexión a la base de datos es directa (direct connection string), no a través de connection pooler.
