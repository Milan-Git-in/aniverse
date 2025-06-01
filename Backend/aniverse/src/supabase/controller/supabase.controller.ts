import { Controller } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}
}
