import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['authorization']?.split(' ')[1]; // Se espera que el token venga en formato "Bearer token"
    console.log('Authorization header:', request.headers['authorization']);
    console.log('Extracted token:', token);

    if (!token) {
      console.log('Token is missing');
      throw new ForbiddenException('Access token is missing');
    }

    const isValid = await this.authService.validateToken(token);
    console.log('Token validation result:', isValid);

    if (!isValid) {
      console.log('Invalid access token');
      throw new ForbiddenException('Invalid access token');
    }

    console.log('Access token is valid');
    return true;
  }
}

