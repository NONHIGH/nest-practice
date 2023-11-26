import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: +configuration().database.port,
      username: configuration().database.username,  
      password: configuration().database.password,
      database: configuration().database.database,
      entities: [
        join(__dirname, '**', '*.entity{.ts,.js}'),
        join(__dirname, '**', '**', '*.entity{.ts,.js}'),
        join(__dirname, '**', 'entities', '*.entity{.ts,.js}'),
      ],
      synchronize: true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  constructor(private configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
    
  }
}
