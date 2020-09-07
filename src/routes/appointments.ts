// src/routes/index.ts
import { Router, request, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointmentService = new CreateAppointmentService();

	const appointment = await createAppointmentService.execute({
		provider_id,
		date: parsedDate,
	});
	return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentRepository);
	return response.json(await appointmentRepository.find());
});

export default appointmentsRouter;
