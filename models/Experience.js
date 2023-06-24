import mongoose from 'mongoose';

// const pointSchema = new mongoose.Schema({
// 	type: String,
// }); Pensar en reemplazar este esquema en points : [pointSchema]

const experienceSchema = new mongoose.Schema({
	title: String,
	company_name: String,
	icon: String,
	iconBg: String,
	date: String,
	embedId: String,
	points: {
		type: [String], // El atributo 'points' es un array de cadenas de texto
		// Otras opciones y validaciones aquí
	},
});

export const Experience = mongoose.model('Experience', experienceSchema);
