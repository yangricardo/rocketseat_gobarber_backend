import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
interface CreateAppointmentRequest {
	provider_id: string;
	date: Date;
}

/**
 * Dependency Inversion:
 */

export default class CreateAppointmentService {
	public async execute({
		provider_id,
		date,
	}: CreateAppointmentRequest): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}
