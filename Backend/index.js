require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();



// Middlewares - CORS actualizado
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',  // Vite dev
    'http://localhost:4173',  // Preview de Vite
    'https://proyect-deploy-full-stack-production-45cc.up.railway.app' 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// Agrega esto ANTES de la línea del static para ver la ruta
const fs = require('fs');
const uploadsPath = path.join(__dirname, 'Public', 'uploads');

// Listar archivos en la carpeta uploads
try {
  const files = fs.readdirSync(uploadsPath);
  console.log('📁 Archivos en uploads:', files);
} catch (error) {
  console.error('❌ Error leyendo carpeta uploads:', error.message);
}

console.log('🔍 Ruta de uploads:', uploadsPath);
console.log('🔍 ¿Existe la carpeta?', require('fs').existsSync(uploadsPath));

app.use('/uploads', express.static(uploadsPath));

// Rutas
const authRoutes = require('./Routes/auth.routes');
const emprendimientoRoutes = require('./Routes/emprendimientos.routes');
const comentarioRoutes = require('./Routes/comentarios.routes');
const reporteRoutes = require('./Routes/reportes.routes');

app.use('/api/auth', authRoutes);
app.use('/api/emprendimientos', emprendimientoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/reportes', reporteRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});