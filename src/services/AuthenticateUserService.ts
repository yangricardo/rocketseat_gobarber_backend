import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface AuthenticateUserRequest {
	email: string;
	password: string;
}

interface AuthenticateUserResponse {
	user: User;
}

export default class AuthenticateUserService {
	public async execute({
		email,
		password,
	}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const usersRepository = getRepository(User);
		const user = await usersRepository.findOne({ where: { email } });
		if (!user) throw new Error('Incorrect email/password combination');
		const passwordMatched = await compare(password, user.password);
		if (!passwordMatched)
			throw new Error('Incorrect email/password combination');
		return { user };
	}
}
