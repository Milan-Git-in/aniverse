import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseController } from './supabase.controller';
import { SupabaseService } from '../service/supabase.service';
import * as dotenv from 'dotenv';

describe('SupabaseController', () => {
  let controller: SupabaseController;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupabaseController],
      providers: [SupabaseService],
    }).compile();

    controller = module.get<SupabaseController>(SupabaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
