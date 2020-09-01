import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
	provider: string;
	date: Date;
}

export default class AppointmentRepository {
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public create({ provider, date }: CreateAppointmentDTO): Appointment {
		const appointment: Appointment = new Appointment({ provider, date });
		this.appointments.push(appointment);
		return appointment;
	}

	public findByDate(date: Date): Appointment | null {
		const findAppointmentInSameDate = this.appointments.find(appointment =>
			isEqual(date, appointment.date),
		);

		return findAppointmentInSameDate || null;
	}

	public all(): Appointment[] {
		return this.appointments;
	}
}
