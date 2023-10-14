import { Router } from 'express';
import { PortfData } from '../datas/PortfData.js';
import { Tech } from '../models/Tech.js';
import { NavLink } from '../models/NavLink.js';
import { AboutService } from '../models/AboutService.js';
import { Experience } from '../models/Experience.js';
import { Feedback } from '../models/Feedback.js';
import { Work } from '../models/Work.js';
import multer from 'multer';

const PortfRouter = Router();

PortfRouter.get('/add-navlinks', async (req, res) => {
	const createNavLinks = await NavLink.insertMany(PortfData.navLinks);
	res.send({ createNavLinks });
});

PortfRouter.get('/navlinks', async (req, res) => {
	const navLinks = await NavLink.find({});
	res.send(navLinks);
});

/**************************************************************************** */

PortfRouter.get('/add-aboutservices', async (req, res) => {
	const createServices = await AboutService.insertMany(PortfData.services);
	res.send({ createServices });
});

PortfRouter.get('/aboutservices', async (req, res) => {
	const services = await AboutService.find({});
	res.send(services);
});

/**************************************************************************** */

PortfRouter.get('/add-techs', async (req, res) => {
	const createTechnologies = await Tech.insertMany(PortfData.technologies);
	res.send({ createTechnologies });
});

PortfRouter.get('/techs', async (req, res) => {
	const technologies = await Tech.find({});
	res.send(technologies);
});

/**************************************************************************** */

PortfRouter.get('/add-experiences', async (req, res) => {
	const createExperiences = await Experience.insertMany(PortfData.experiences);
	res.send({ createExperiences });
});

PortfRouter.get('/experiences', async (req, res) => {
	const experiences = await Experience.find({});
	res.send(experiences);
});

/**************************************************************************** */

PortfRouter.get('/add-testimonials', async (req, res) => {
	const createTestimonials = await Feedback.insertMany(PortfData.testimonials);
	res.send({ createTestimonials });
});

/* ::configura la ubicación donde deseas guardar las imágenes:: */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/assets/feedback'); // la carpeta de destino
	},
	filename: (req, file, cb) => {
		const filename = `${Date.now()}-${file.originalname}`;
		cb(null, filename);
	},
});

/* ::configura multer:: */
const upload = multer({ storage: storage });

PortfRouter.post('/new-testimonial', upload.single('image'), async (req, res) => {
	try {
		/* ::obtiene los datos del cuerpo de la solicitud:: */
		const { testimonial, name, designation, company } = req.body;

		/* ::el nombre del archivo de imagen cargado se encuentra en req.file.filename:: */
		const image = req.file.filename;

		/* ::crear una instancia del modelo Feebback::*/
		const newTestimonial = new Feedback({
			testimonial,
			name,
			designation,
			company,
			image,
		});

		/* ::guarda el nuevo testimonio en la base de datos:: */
		const saveTestimonial = await newTestimonial.save();

		res.status(201).json(saveTestimonial);
	} catch (err) {
		console.error('Error al guardar el testimonio:', err);
		res.status(500).json({ error: 'No se pudo guardar el testimonio' });
	}
});

PortfRouter.get('/testimonials', async (req, res) => {
	const testimonials = await Feedback.find({});
	res.send(testimonials);
});

/**************************************************************************** */

PortfRouter.get('/add-projects', async (req, res) => {
	const createProjects = await Work.insertMany(PortfData.projects);
	res.send({ createProjects });
});

PortfRouter.get('/projects', async (req, res) => {
	const projects = await Work.find({});
	res.send(projects);
});

export default PortfRouter;
