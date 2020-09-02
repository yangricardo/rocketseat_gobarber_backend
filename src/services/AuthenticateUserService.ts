import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
		const { expiresIn, secret } = authConfig.jwt;
		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});
		return { user, token };
	}
}
