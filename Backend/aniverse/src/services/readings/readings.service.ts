import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/service/supabase.service';
@Injectable()
export class ReadingsService {
  private readonly supabase: SupabaseClient;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async fetchManhwas() {
    const { data, error } = await this.supabase.from('manhwas').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async fetchLight_Novels() {
    const { data, error } = await this.supabase.from('LN').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
