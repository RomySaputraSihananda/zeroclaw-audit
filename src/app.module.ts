import { Module } from '@nestjs/common';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [AuditModule],
})
export class AppModule {}
