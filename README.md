# Licorera

Proyecto de tienda de licores construido con **Next.js 15**, **Zustand** y **Supabase**.

## Configuración

1. Copia `.env.example` a `.env.local` y completa las credenciales de Supabase.
2. Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

## Descripción

- Página principal que obtiene los productos desde Supabase.
- Carrito manejado con Zustand y botón para enviar el pedido por WhatsApp.
- Panel de administración con CRUD de productos y subida de imágenes.
- Middleware que protege las rutas de administración.

El diseño utiliza un tema oscuro con detalles en dorado y la fuente Geist.

## Esquema de productos

El proyecto utiliza una tabla `products` en Supabase. El script SQL para crearla se encuentra en `supabase/schema.sql`.

| Columna     | Tipo        | Requerido | Default             | Comentario                     |
|-------------|-------------|-----------|---------------------|-------------------------------|
| id          | uuid        | ✅        | uuid_generate_v4()  | Identificador único           |
| name        | text        | ✅        | —                   | Nombre del producto           |
| description | text        | ❌        | —                   | Descripción corta             |
| brand       | text        | ❌        | —                   | Marca o productor             |
| category    | text        | ❌        | —                   | Categoría del producto        |
| price       | integer     | ✅        | —                   | Precio en pesos               |
| stock       | integer     | ✅        | 0                   | Cantidad disponible           |
| available   | boolean     | ✅        | true                | Visible al público            |
| image_url   | text        | ❌        | —                   | URL pública de la imagen      |
| created_at  | timestamptz | ✅        | now()               | Fecha de creación             |
| updated_at  | timestamptz | ✅        | now()               | Fecha de última actualización |

La tabla cuenta con índices en las columnas `available`, `category` y `brand` para
mejorar las consultas. Además, incluye un trigger que actualiza el campo
`updated_at` cada vez que se modifica un registro.

