require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',
    'http://localhost:8080',
    'https://proyect-deploy-full-stack-production-45cc.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Public', 'uploads')));

// ¡AGREGAR ESTAS RUTAS DE PRUEBA!
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando', timestamp: new Date() });
});

app.get('/api/test-db', async (req, res) => {
  const connection = require('./Database/connection');
  try {
    const conn = await connection.getConnection();
    await conn.ping();
    conn.release();
    res.json({ message: 'BD conectada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas principales
const authRoutes = require('./Routes/auth.routes');
const emprendimientoRoutes = require('./Routes/emprendimientos.routes');
const comentarioRoutes = require('./Routes/comentarios.routes');
const reporteRoutes = require('./Routes/reportes.routes');

app.use('/api/auth', authRoutes);
app.use('/api/emprendimientos', emprendimientoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/reportes', reporteRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});