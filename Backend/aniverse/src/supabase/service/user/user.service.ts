import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDTo } from '../../../DTOs/create-user.dto';
import { SupabaseService } from '../../../supabase/service/supabase.service';
import { customizationResult } from '../../../utils/types';
import { BloomFilterService } from '../../../services/filter/bloom-filter.service';
@Injectable()
export class UserService {
  private supabase: SupabaseClient;
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly bloomFilterService: BloomFilterService,
  ) {
    this.supabase = supabaseService.getClient();
  }

  async createUser(createUserDto: CreateUserDTo) {
    const { username, email } = createUserDto;

    if (!username || !email) {
      return { success: false, message: 'Username and email are required' };
    }
    const emailExists = await this.bloomFilterService.probablyHas(email);
    if (emailExists) {
      return {
        success: false,
        message:
          'Email already exists, if you think this is a mistake, please try again later',
        data: this.bloomFilterService.autoRefresh(),
      };
    }
    const { data, error } = await this.supabase
      .from('user')
      .insert([{ username, email }]);

    if (error) {
      console.error('Error creating user:', error.message);
      throw new Error('Error creating user');
    }

    return { success: true, message: 'User created successfully', data };
  }

  async uploadProfile(file: Express.Multer.File): customizationResult {
    if (!file) {
      console.log(file);
      return { success: false, message: 'No file uploaded', data: null };
    }
    const filePath = `${Date.now()}_${file.originalname}`;
    const { data, error } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '31356000',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading Picture:', error.message, data);
      return { success: false, message: 'Error uploading Picture', data: null };
    }

    const three_years = 3 * 365 * 24 * 60 * 60;

    const { data: signedUrlData, error: urlError } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .createSignedUrls([filePath], three_years);

    if (urlError) {
      console.error('Error creating signed urls:', urlError.message);
      return {
        success: false,
        message: 'Error creating signed urls',
        data: null,
      };
    }
    return {
      success: true,
      message: 'Profile uploaded successfully',
      data: signedUrlData[0].signedUrl,
    };
  }
  async updateProfile(
    file: Express.Multer.File,
    email: string,
  ): customizationResult {
    const res = await this.uploadProfile(file);
    if (res.success !== true || !res.data) {
      throw new Error('Error updating profile' + res.message);
    }
    const url: string = res.data;
    console.log(url);
    const { data, error } = await this.supabase
      .from('user')
      .update({ profile_picture: url })
      .eq('email', email);
    if (error) {
      console.error('Error updating profile:', error.message);
      throw new Error('Error updating profile');
    }
    return {
      success: true,
      message: 'Profile updated successfully',
      data,
    };
  }
  async updateEmail(email: string, newEmail: string): customizationResult {
    if (!email || !newEmail)
      return {
        success: false,
        message: 'Email and new email are required',
        data: null,
      };
    if (this.bloomFilterService.probablyHas(newEmail)) {
      return {
        success: false,
        message:
          'Email already exists, if you think this is a mistake, please try again later',
        data: this.bloomFilterService.autoRefresh(),
      };
    }
    const { data, error } = await this.supabase
      .from('user')
      .update({ email: newEmail })
      .eq('email', email);
    if (error) {
      console.error('Error updating email:', error.message);
      throw new Error('Error updating email');
    }
    this.bloomFilterService.addToFilter(newEmail);
    return {
      success: true,
      message: 'Email updated successfully',
      data,
    };
  }
  async updateUsername(username: string, email: string): customizationResult {
    if (!username || !email) {
      return {
        success: false,
        message: 'Username and email are required',
        data: null,
      };
    }
    const { data, error } = await this.supabase
      .from('user')
      .update({ username })
      .eq('email', email);
    if (error) {
      console.error('Error updating username:', error.message);
      throw new Error('Error updating username');
    }
    return {
      success: true,
      message: 'Username updated successfully',
      data,
    };
  }
}
