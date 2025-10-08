// app.js - Servidor Express para Tienda en Línea

// Importar dependencias necesarias
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

// Crear la aplicación Express
const app = express();
const PORT = 3000;

// Ruta del archivo de productos
const PRODUCTOS_FILE = path.join(__dirname, 'data', 'productos.json');

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Función auxiliar para leer productos del archivo
async function leerProductos() {
  try {
    // Verificar si el archivo existe
    await fs.access(PRODUCTOS_FILE);
    
    // Leer el contenido del archivo
    const data = await fs.readFile(PRODUCTOS_FILE, 'utf-8');
    
    // Parsear el JSON
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe o está vacío, retornar array vacío
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Función auxiliar para escribir productos al archivo
async function escribirProductos(productos) {
  try {
    // Crear el directorio data si no existe
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    
    // Escribir los productos en formato JSON con formato legible
    await fs.writeFile(
      PRODUCTOS_FILE, 
      JSON.stringify(productos, null, 2),
      'utf-8'
    );
  } catch (error) {
    throw error;
  }
}

// RUTAS

// Ruta principal - Página de bienvenida
app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Bienvenido a la Tienda en Línea',
    mensaje: '¡Explora nuestros productos y gestiona tu inventario!'
  });
});

// Ruta para mostrar productos
app.get('/productos', async (req, res, next) => {
  try {
    const productos = await leerProductos();
    res.render('productos', {
      titulo: 'Lista de Productos',
      productos: productos
    });
  } catch (error) {
    next(error);
  }
});

// Ruta para agregar un nuevo producto (POST)
app.post('/productos/agregar', async (req, res, next) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    
    // Validación básica
    if (!nombre || !descripcion || !precio) {
      return res.status(400).send('Todos los campos son requeridos');
    }
    
    // Leer productos existentes
    const productos = await leerProductos();
    
    // Crear nuevo producto con ID único
    const nuevoProducto = {
      id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: parseFloat(precio),
      fechaCreacion: new Date().toISOString()
    };
    
    // Agregar el nuevo producto al array
    productos.push(nuevoProducto);
    
    // Guardar en el archivo
    await escribirProductos(productos);
    
    // Redirigir a la página de productos
    res.redirect('/productos');
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener productos en formato JSON (API)
app.get('/api/productos', async (req, res, next) => {
  try {
    const productos = await leerProductos();
    res.json({
      success: true,
      count: productos.length,
      productos: productos
    });
  } catch (error) {
    next(error);
  }
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).render('error', {
    titulo: 'Página no encontrada',
    codigo: 404,
    mensaje: 'Lo sentimos, la página que buscas no existe.',
    ruta: req.url,
    error: null
  });
});

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err);
  
  res.status(500).render('error', {
    titulo: 'Error del servidor',
    codigo: 500,
    mensaje: 'Ha ocurrido un error en el servidor. Por favor, intenta nuevamente más tarde.',
    ruta: req.url || null,
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     🛍️  Servidor de Tienda en Línea Iniciado         ║
╠════════════════════════════════════════════════════════╣
║  Puerto: ${PORT}                                         ║
║  URL: http://localhost:${PORT}                           ║
║  Estado: ✅ Funcionando correctamente                  ║
╚════════════════════════════════════════════════════════╝
  `);
  console.log('Rutas disponibles:');
  console.log('  - GET  /                   -> Página de bienvenida');
  console.log('  - GET  /productos          -> Lista de productos');
  console.log('  - POST /productos/agregar  -> Agregar producto');
  console.log('  - GET  /api/productos      -> API JSON productos');
  console.log('\nPresiona Ctrl+C para detener el servidor\n');
});