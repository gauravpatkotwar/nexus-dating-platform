import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DiscoverModule } from './modules/discover/discover.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MutualRevealModule } from './modules/mutual-reveal/mutual-reveal.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    DiscoverModule,
    MessagesModule,
    MutualRevealModule,
    CommunitiesModule,
    AdminModule,
  ],
})
export class AppModule {}
