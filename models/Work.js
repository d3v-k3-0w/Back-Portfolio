import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
	name: String,
	color: String,
});

const projectSchema = new mongoose.Schema({
	name: String,
	description: String,
	tags: [tagSchema], // Atributo de tipo array que contiene objetos del esquema 'tagSchema'
	image: String,
	hostImg: String,
	hostLink: String,
});

export const Work = mongoose.model('Work', projectSchema);
