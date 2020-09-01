// src/routes/index.ts
import { Router, request, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);
		const createAppointmentService = new CreateAppointmentService(
			appointmentRepository,
		);
		const appointment = createAppointmentService.execute({
			provider,
			date: parsedDate,
		});
		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

appointmentsRouter.get('/', (request, response) => {
	return response.json(appointmentRepository.all());
});

export default appointmentsRouter;
