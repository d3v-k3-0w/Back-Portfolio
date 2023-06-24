import mongoose from 'mongoose';

const navLinkSchema = new mongoose.Schema({
	//--

	id: String,
	title: String,
});

export const NavLink = mongoose.model('NavLink', navLinkSchema);
