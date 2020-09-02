import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	// validação do token jwt

	const authHeader = request.headers.authorization;
	if (!authHeader) throw new Error('JWT Token is Required!');
	const [, token] = authHeader.split(' ');
	try {
		const decoded = verify(token, authConfig.jwt.secret);
		console.log(decoded);
		return next();
	} catch {
		throw new Error(`Invalid JWT Token`);
	}
}