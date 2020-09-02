// src/routes/index.ts
import { Router } from 'express';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';

const usersRouter = Router();
const upload = multer(uploadConfig);
/**
 * Repositories
 *  Services
 */

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;
		const createUser = new CreateUserService();
		const user = await createUser.execute({ name, email, password });
		delete user.password;
		return response.json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		console.log(request.file);
		return response.json({ ok: true });
	},
);

export default usersRouter;
