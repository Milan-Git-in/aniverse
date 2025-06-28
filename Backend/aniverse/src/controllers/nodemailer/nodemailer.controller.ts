import { Body, Controller, Post } from '@nestjs/common';
import { NodemailerService } from '../../services/nodemailer/nodemailer.service';
@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}
  @Post('sendMail')
  async sendMail(@Body() body: { email: string }) {
    return this.nodemailerService.sendOtp(body.email);
  }

  @Post('verifyJwt')
  async verifyJwt(@Body() body: { token: string }) {
    return this.nodemailerService.verifyJwt(body.token);
  }

  @Post('verifyMail')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.nodemailerService.verifyOtp(body.email, body.otp);
  }
}
