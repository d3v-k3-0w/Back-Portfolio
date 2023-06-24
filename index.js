import 'dotenv/config';
import './database/conxdb.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import PortfRouter from './routes/Portfs.js';

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Reemplaza con la URL de tu aplicación de React
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Configurar la ruta de los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

/*::ROUTES::*/
app.use('/api/portfolio/', PortfRouter);

/* ::CONFIGURE CORS:: */
app.use(cors());

// Middleware para establecer el encabezado 'Permissions-Policy'
app.use((req, res, next) => {
	res.setHeader('Permissions-Policy', '');
	next();
});

app.get('/', (req, res) => {
	//---
	res.send('Server is Ready');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	//---
	console.log(`Server at http://localhost:${PORT}`);
});
