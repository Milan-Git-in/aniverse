import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RedisService } from '../redis/redis.service';
import { Redis } from '@upstash/redis';
@Injectable()
export class NodemailerService {
  private readonly redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }
  async getTransporter(): Promise<nodemailer.Transporter> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Aniverse.otp@gmail.com',
        pass: process.env.APP_PASSWORD,
      },
    });
    return transporter;
  }

  async sendMail(to: string, html: string): Promise<void> {
    const transporter = await this.getTransporter();
    const mailOptions = {
      from: 'Aniverse <Aniverse.otp@gmail.com>',
      to,
      subject: 'Yo! Sashi buri',
      html,
    };
    await transporter.sendMail(mailOptions);
  }

  async sendOtp(to: string): Promise<{ otp: number; message: string }> {
    const otp = this.generateOtp();
    const res = await this.checkAlreadySent(to);
    if (res.flag) {
      return { otp: res.otp, message: 'OTP already sent' };
    }
    this.setAlreadySent(to, otp);
    const html = `<div style="font-family: 'Segoe UI', sans-serif; background: #f9f9f9; padding: 20px; border-radius: 8px; color: #333;">
    <h2 style="text-align: center; color: #4A90E2;">🚀 One-Time Password Incoming!</h2>
    <p>Hey there, legend! 😎</p>
    <p>Looks like you’re trying to do something cool. Here’s your magic 6-digit code to make the magic happen:</p>
    
    <div style="
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      text-align: center;
      margin: 20px 0;
      
    ">
      ${otp}
    </div>

    <p style="font-size: 14px; color: #777;">
      ⚠️ Don’t share this with anyone. We’ll never ask for your OTP. Not even your cat. 🐱
    </p>

    <p style="margin-top: 30px;">Cheers, <br/> <strong>Aniverse Team 🌌</strong></p>

   
  </div>
`;
    await this.sendMail(to, html);
    return { otp: Number(otp), message: 'OTP sent successfully' };
  }

  async checkAlreadySent(to: string): Promise<{ otp: number; flag: boolean }> {
    const otp = await this.redis.get(`otp:${to}`);
    return { otp: Number(otp), flag: otp ? true : false };
  }

  async setAlreadySent(to: string, otp: string): Promise<void> {
    const redisKey = `otp:${to}`;
    await this.redis.set(redisKey, otp, { ex: 1200 });
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async removeAlreadySent(to: string): Promise<void> {
    await this.redis.del(`otp:${to}`);
  }

  async verifyOtp(
    to: string,
    otp: string,
  ): Promise<{ sucess: boolean; message: string }> {
    const res = await this.checkAlreadySent(to);

    if (res.otp !== null && res.otp === Number(otp)) {
      await this.removeAlreadySent(to);
      return { sucess: true, message: 'OTP verified successfully' };
    }

    console.error('Invalid OTP Error: ', res.otp, otp);
    return { sucess: false, message: 'Invalid OTP' };
  }
}
