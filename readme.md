# Sistema de Gestión de Productos - Tienda en Línea

## Descripción

Aplicación web backend construida con Node.js y Express para gestionar productos de una tienda en línea. Permite agregar, visualizar y almacenar productos de forma persistente utilizando el sistema de archivos.

## Dependencias

```bash
npm install
```

Este comando instalará:
- express
- ejs
- body-parser
- nodemon (dev dependency)

## Ejecución

### Modo desarrollo (con auto-reinicio)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

## Estructura del Proyecto

```
tienda-online/
│
├── node_modules/          # Dependencias (generado automáticamente)
├── public/                # Archivos estáticos
│   ├── css/
│   │   └── styles.css    # Estilos de la aplicación
│   └── images/           # Imágenes (opcional)
├── views/                 # Plantillas EJS
│   ├── index.ejs         # Página de inicio
│   ├── productos.ejs     # Página de productos
│   └── error.ejs         # Página de errores
├── data/                  # Almacenamiento de datos
│   └── productos.json    # Archivo de productos (se crea automáticamente)
├── app.js                 # Servidor Express principal
├── package.json           # Configuración del proyecto
├── package-lock.json      # Versiones exactas de dependencias
└── README.md             # Este archivo
```

## Rutas Disponibles

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/` | GET | Página de bienvenida |
| `/productos` | GET | Lista de productos con formulario |
| `/productos/agregar` | POST | Agregar nuevo producto |
| `/api/productos` | GET | API JSON con todos los productos |

## Persistencia

Los productos permanecen guardados incluso después de reiniciar el servidor. Revisa el archivo `data/productos.json` para ver los datos almacenados.

## API REST

### Obtener todos los productos (JSON)

```bash
GET http://localhost:3000/api/productos
```

Respuesta:
```json
{
  "success": true,
  "count": 2,
  "productos": [
    {
      "id": 1,
      "nombre": "Laptop Dell",
      "descripcion": "Laptop de alta gama",
      "precio": 1200,
      "fechaCreacion": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **EJS** - Motor de plantillas para generar HTML dinámico
- **Body-Parser** - Middleware para procesar datos de formularios
- **File System (fs)** - Módulo nativo para persistencia de datos
- **Nodemon** - Herramienta de desarrollo para auto-reinicio

## Manejo de Errores

La aplicación incluye manejo de errores para:

- **404** - Página no encontrada
- **500** - Error interno del servidor
- Errores de lectura/escritura de archivos
- Validación de formularios

## Pruebas

### Prueba manual básica

1. Inicia el servidor: `npm run dev`
2. Abre tu navegador en `http://localhost:3000`
3. Navega a la sección de productos
4. Agrega varios productos
5. Reinicia el servidor
6. Verifica que los productos siguen ahí
7. Intenta acceder a una ruta inexistente (ej: `/ruta-falsa`)

## Datos de Ejemplo

El archivo `data/productos.json` tendrá esta estructura:

```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell XPS 15",
    "descripcion": "Laptop profesional con procesador Intel i7",
    "precio": 1500.00,
    "fechaCreacion": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "nombre": "Mouse Logitech MX Master 3",
    "descripcion": "Mouse ergonómico inalámbrico",
    "precio": 99.99,
    "fechaCreacion": "2024-01-15T11:45:00.000Z"
  }
]
```

## Por implementar

- Eliminar productos
- Subir imágenes de productos 

## Autor

Jorge Garrido - Proyecto de aprendizaje Backend con Node.js