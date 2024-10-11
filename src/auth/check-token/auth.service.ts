import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<boolean> {
    console.log('Validating token:', token);

    try {
      const decoded = this.jwtService.verify(token);
      console.log('Token decoded:', decoded);
      return !!decoded;
    } catch (error) {
      console.log('Token validation error:', error.message);
      return false;
    }
  }
}