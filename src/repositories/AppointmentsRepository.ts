import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
	provider: string;
	date: Date;
}

export default class AppointmentRepository {
	public findByDate(date: Date): Appointment | null {
		const findAppointmentInSameDate = this.appointments.find(appointment =>
			isEqual(date, appointment.date),
		);

		return findAppointmentInSameDate || null;
	}
}
