import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
	//--

	name: String,
	icon: String,
});

export const Tech = mongoose.model('Tech', technologySchema);
