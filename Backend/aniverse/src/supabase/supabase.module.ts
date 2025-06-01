import { Module } from '@nestjs/common';
import { SupabaseService } from './service/supabase.service';
import { SupabaseController } from './controller/supabase.controller';
import { UserService } from './service/user/user.service';

@Module({
  providers: [SupabaseService, UserService],
  exports: [SupabaseService],
  controllers: [SupabaseController],
})
export class SupabaseModule {}
