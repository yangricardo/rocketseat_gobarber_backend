import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	// validação do token jwt

	const authHeader = request.headers.authorization;

	if (!authHeader) throw new AppError('JWT Token is Required!', 401);

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);
		const { sub } = decoded as TokenPayload;
		request.user = {
			id: sub,
		};
		return next();
	} catch {
		throw new AppError(`Invalid JWT Token`, 401);
	}
}
