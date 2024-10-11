import { Test, TestingModule } from '@nestjs/testing';
import { CheckTokenGuard } from './check-token.guard';
import { AuthService } from './auth.service'; // Servicio de autenticación
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

describe('CheckTokenGuard', () => {
  let guard: CheckTokenGuard;
  let authService: AuthService;

  beforeEach(async () => {
    // Mock para el AuthService
    const mockAuthService = {
      validateToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckTokenGuard,
        { provide: AuthService, useValue: mockAuthService }, // Se usa el mock
      ],
    }).compile();

    guard = module.get<CheckTokenGuard>(CheckTokenGuard);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería estar definido', () => {
    expect(guard).toBeDefined();
  });

  it('debería permitir el acceso si el token es válido', async () => {
    // Simula que el token es válido
    (authService.validateToken as jest.Mock).mockResolvedValue(true);

    // Mock del ExecutionContext y Request
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid_token', // Token válido
          },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(authService.validateToken).toHaveBeenCalledWith('valid_token');
  });

  it('debería lanzar ForbiddenException si no se proporciona el token', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(guard.canActivate(context)).rejects.toThrow(
      'Access token is missing',
    );
  });

  it('debería lanzar ForbiddenException si el token es inválido', async () => {
    // Simula que el token es inválido
    (authService.validateToken as jest.Mock).mockResolvedValue(false);

    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid_token',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
    expect(authService.validateToken).toHaveBeenCalledWith('invalid_token');
  });
});
