import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';

interface Request {
	provider: string;
	date: Date;
}

/**
 * Dependency Inversion:
 */

export default class CreateAppointmentService {
	private appointmentRepository: AppointmentRepository;

	constructor(appointmentRepository: AppointmentRepository) {
		this.appointmentRepository = appointmentRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = this.appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		return this.appointmentRepository.create({
			provider,
			date: appointmentDate,
		});
	}
}
