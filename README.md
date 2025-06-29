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
