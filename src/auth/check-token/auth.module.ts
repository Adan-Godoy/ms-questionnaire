import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Importa JwtModule
import { AuthService } from './auth.service';
import { CheckTokenGuard } from './check-token.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miSuperSecreto', 
      signOptions: { expiresIn: '15m' }, 
    }),
  ],
  providers: [AuthService, CheckTokenGuard],
  exports: [AuthService],
})
export class AuthModule {}
