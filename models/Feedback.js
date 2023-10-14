import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
	testimonial: String,
	name: String,
	designation: String,
	company: String,
	image: String,
});

export const Feedback = mongoose.model('Feedback', testimonialSchema);
