import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
	//--

	title: String,
	icon: String,
});

export const AboutService = mongoose.model('AboutService', serviceSchema);
