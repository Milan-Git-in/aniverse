import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from 'src/services/youtube/youtube.service';

describe('YoutubeController', () => {
  let controller: YoutubeController;

  beforeEach(async () => {
    const mockYoutubeService = {
      getSearchResults: jest.fn().mockResolvedValue(['mock search result']),
      fetchLatest: jest.fn().mockResolvedValue(['mock latest result']),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeController],
      providers: [
        {
          provide: YoutubeService,
          useValue: mockYoutubeService,
        },
      ],
    }).compile();

    controller = module.get<YoutubeController>(YoutubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have getSearchResults method', () => {
    expect(controller.getSearchResults).toBeDefined();
  });

  it('should have getLatest method', async () => {
    expect(controller.getLatest).toBeDefined();
    const res = await controller.getLatest();
    expect(res).not.toBe(null);
    expect(Array.isArray(res)).toBe(true); // Optional: check the mocked value
  });
});
