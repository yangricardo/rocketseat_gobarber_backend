import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { sign } from 'jsonwebtoken';

interface AuthenticateUserRequest {
	email: string;
	password: string;
}

interface AuthenticateUserResponse {
	user: User;
	token: string;
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
		const token = sign({}, 'fd7g578f76zgd67g5ds675h765afd875h7daf67fgz656zxv', {
			subject: user.id,
			expiresIn: '1d',
		});
		return { user, token };
	}
}
