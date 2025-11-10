import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { Profile } from './entities/profile.entity';

const createDto: CreateProfileDto = { name: 'Editor' } as CreateProfileDto;
const updateDto: UpdateProfileDto = { name: 'Manager' } as UpdateProfileDto;

describe('ProfilesService', () => {
  let service: ProfilesService;
  let initialProfilesCount: number;
  let initialProfile: Profile;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesService],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);

    initialProfilesCount = service.findAll().length;
    initialProfile = service.findAll()[0];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of profiles', () => {
      const profiles = service.findAll();
      expect(profiles).toBeInstanceOf(Array);
      expect(profiles.length).toBe(initialProfilesCount);
    });
  });

  describe('findOne', () => {
    it('should return a profile for a valid ID', () => {
      const foundProfile = service.findOne('1');
      expect(foundProfile.name).toBe('Admin');
    });

    it('should throw NotFoundException if ID does not exist', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should successfully create and return the new profile', () => {
      const newProfile = service.create(createDto);
      
      expect(newProfile.name).toBe(createDto.name);
      expect(service.findAll().length).toBe(initialProfilesCount + 1);
      expect(service.findOne(newProfile.id)).toBeDefined();
    });

    it('should throw ConflictException if profile name already exists (case-insensitive)', () => {
      const dtoWithConflict = { name: 'admin' } as CreateProfileDto;
      
      expect(() => service.create(dtoWithConflict)).toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should successfully update the profile name', () => {
      const updatedProfile = service.update(initialProfile.id, updateDto);
      
      expect(updatedProfile.name).toBe(updateDto.name);
      expect(service.findOne(initialProfile.id).name).toBe(updateDto.name);
    });

    it('should throw NotFoundException if profile ID does not exist', () => {
      expect(() => service.update('999', updateDto)).toThrow(NotFoundException);
    });
    
    it('should throw ConflictException if new name conflicts with another profile', () => {
      // Trying to update to an existing profile name 'User'
      const conflictDto = { name: 'User' } as UpdateProfileDto;
      
      expect(() => service.update(initialProfile.id, conflictDto)).toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should successfully remove a profile', () => {
      service.remove(initialProfile.id);
      
      expect(service.findAll().length).toBe(initialProfilesCount - 1);
      expect(() => service.findOne(initialProfile.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if ID does not exist', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });
});