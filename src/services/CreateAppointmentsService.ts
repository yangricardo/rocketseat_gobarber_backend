import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
interface Request {
	provider: string;
	date: Date;
}

/**
 * Dependency Inversion:
 */

export default class CreateAppointmentService {
	public async execute({ provider, date }: Request): Appointment {
		const appointmentRepository = getCustomRepository(AppointmentRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			provider,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}
