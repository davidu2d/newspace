import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/auth-api/src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration] 
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port: parseInt(<string>process.env.MSSQL_PORT),
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      migrationsRun: true,
      options: { encrypt: false },
      migrations: ['dist/apps/auth-api/src/app/db/migration/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/db/migration',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
