import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { TryonModule } from './modules/tryon/tryon.module';
import { EventsModule } from './modules/events/events.module';
import { AdminModule } from './modules/admin/admin.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { CommerceModule } from './modules/commerce/commerce.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Feature modules
    HealthModule,
    TryonModule,
    EventsModule,
    AdminModule,
    IntegrationsModule,
    CommerceModule,
    ProvidersModule,
    StorageModule,
  ],
})
export class AppModule {}
