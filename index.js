import 'dotenv/config';
import './database/conxdb.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

import PortfRouter from './routes/Portfs.js';

const app = express();

//++ middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_PROD || process.env.ORIGIN_DEV,
  })
);

//++ configurar la ruta de los archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

//++ routes
app.use('/api/portfolio/', PortfRouter);

//++ middleware para establecer el encabezado 'Permissions-Policy'
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', '');
  next();
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

//++ función para hacer ping al servidor
const pingServer = () => {
  fetch(process.env.BACKEND_URL)
    .then((response) => {
      if (response.ok) {
        console.log('Ping enviado al servidor');
      } else {
        console.error('Error al hacer ping al servidor');
      }
    })
    .catch((err) => {
      console.error('Error al enviar ping:', err);
    });
};

//++ ping inmediato al iniciar el servidor
pingServer();

setInterval(pingServer, 840000); // 840000 ms = 14 minutos

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
