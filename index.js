import 'dotenv/config';
import './database/conxdb.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

import PortfRouter from './routes/Portfs.js';

const app = express();

/* ::Middleware para analizar el cuerpo de la solicitud como JSON:: */
app.use(express.json());

/* ::CONFIGURE CORS:: */
// const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			if (!origin || whiteList.includes(origin)) {
// 				return callback(null, origin);
// 			}
// 			return callback('Error de CORS origin: ' + origin + 'No autorizado!');
// 		},
// 	})
// );

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);

/* ::configurar la ruta de los archivos estáticos:: */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

/*::ROUTES::*/
app.use('/api/portfolio/', PortfRouter);

/* ::middleware para establecer el encabezado 'Permissions-Policy':: */
app.use((req, res, next) => {
	res.setHeader('Permissions-Policy', '');
	next();
});

app.get('/', (req, res) => {
	res.send('Server is ready');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server at http://localhost:${PORT}`);
});
