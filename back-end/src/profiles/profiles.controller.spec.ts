import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { validate } from 'class-validator';

const mockProfile = {
  id: '1',
  name: 'Admin',
};

const mockProfilesService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: mockProfilesService,
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    service = module.get<ProfilesService>(ProfilesService);

    jest.clearAllMocks();
  });

  describe('DTO Validation', () => {
    it('should validate CreateProfileDto with valid data', async () => {
      const dto = new CreateProfileDto();
      dto.name = 'Valid Name';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should invalidate CreateProfileDto with short name', async () => {
      const dto = new CreateProfileDto();
      dto.name = 'A'; // Muito curto

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
    });

    it('should invalidate CreateProfileDto with empty name', async () => {
      const dto = new CreateProfileDto();
      dto.name = '';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('findAll', () => {
    it('should return all profiles', () => {
      mockProfilesService.findAll.mockReturnValue([mockProfile]);

      const result = controller.findAll();

      expect(result).toEqual([mockProfile]);
      expect(mockProfilesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a profile by id', () => {
      mockProfilesService.findOne.mockReturnValue(mockProfile);

      const result = controller.findOne('1');

      expect(result).toEqual(mockProfile);
      expect(mockProfilesService.findOne).toHaveBeenCalledWith('1');
    });

    it('should return error when profile not found', () => {
      mockProfilesService.findOne.mockReturnValue(undefined);

      const result = controller.findOne('999');

      expect(result).toEqual({ error: 'Profile not found' });
    });
  });
});