import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { validate } from 'class-validator';
import { NotFoundException } from '@nestjs/common';

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

    it('should throw NotFoundException when profile not found', () => {
      // Configure the mock to throw NotFoundException
      mockProfilesService.findOne.mockImplementation(() => {
        throw new NotFoundException(`Profile with ID 999 not found`);
      });

      // Verify that the service method was called with the correct parameter
      expect(() => controller.findOne('999')).toThrow(NotFoundException);
      expect(() => controller.findOne('999')).toThrow('Profile with ID 999 not found');

      // Verify that the service method was called with the correct parameter
      expect(mockProfilesService.findOne).toHaveBeenCalledWith('999');
    });
  });
});