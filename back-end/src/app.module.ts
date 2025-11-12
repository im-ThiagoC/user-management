import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
	imports: [UsersModule, ProfilesModule, ConfigModule.forRoot()],
})

export class AppModule {}
