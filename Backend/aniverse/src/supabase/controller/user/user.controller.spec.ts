import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from 'src/supabase/service/user/user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn(),
    updateProfile: jest.fn(),
    updateEmail: jest.fn(),
    updateUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
