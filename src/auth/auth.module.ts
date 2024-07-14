// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../database/database.module'; // Import DatabaseModule if DatabaseService is exported from here
import { DatabaseService } from '../database/database.service'; // Adjust the path if necessary
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    
    DatabaseModule,
    JwtModule.register({
      secret: 'Secret', // Replace with your actual secret
      signOptions: { expiresIn: '1h' }, // Example expiration
    }), // Ensure DatabaseModule is imported if DatabaseService is part of it
  ],
  providers: [
    JwtStrategy,
    DatabaseService,
    AuthService // Include DatabaseService as a provider
  ],
  exports: [JwtStrategy,AuthService], 
  controllers:[AuthController]
  // Export JwtStrategy if needed elsewhere
})
export class AuthModule {}
