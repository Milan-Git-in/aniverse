import { IsString } from 'class-validator';

export class CreateUserDTo {
  @IsString()
  username: string;

  @IsString()
  email: string;
}

/* 

While creating a user, we only ask for user's name and email

email to ask otp to verify and login
username to provide a name for account 


profile picture will be set by default

*/
