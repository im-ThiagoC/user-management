import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

const mockProfilesService = {
  findOne: jest.fn(),
};

const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  isActive: true,
  profileId: '1',
};

const mockProfile = {
  id: '1',
  name: 'Admin',
};

describe('UsersService', () => {
  let service: UsersService;
  let profilesService: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ProfilesService,
          useValue: mockProfilesService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    profilesService = module.get<ProfilesService>(ProfilesService);

    // Reset mock data
    (service as any).users = [mockUser];
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const result = service.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const result = service.findOne('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('findByProfile', () => {
    it('should return users by profile id', () => {
      mockProfilesService.findOne.mockReturnValue(mockProfile);

      const result = service.findByProfile('1');
      expect(result).toEqual([mockUser]);
      expect(mockProfilesService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when profile not found', () => {
      mockProfilesService.findOne.mockReturnValue(undefined);
      expect(() => service.findByProfile('999')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const validCreateDto: CreateUserDto = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      isActive: true,
      profileId: '1',
    };

    it('should create a new user with valid DTO', () => {
      mockProfilesService.findOne.mockReturnValue(mockProfile);

      const result = service.create(validCreateDto);

      expect(result.firstName).toBe(validCreateDto.firstName);
      expect(result.lastName).toBe(validCreateDto.lastName);
      expect(result.email).toBe(validCreateDto.email);
      expect(result.isActive).toBe(validCreateDto.isActive);
      expect(result.profileId).toBe(validCreateDto.profileId);
      expect(result.id).toBeDefined();
      expect(mockProfilesService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw ConflictException when email already exists', () => {
      const duplicateEmailDto: CreateUserDto = {
        ...validCreateDto,
        email: 'john.doe@example.com', // Email already exists
      };

      mockProfilesService.findOne.mockReturnValue(mockProfile);

      expect(() => service.create(duplicateEmailDto)).toThrow(ConflictException);
    });

    it('should throw NotFoundException when profile not found', () => {
      mockProfilesService.findOne.mockReturnValue(undefined);
      expect(() => service.create(validCreateDto)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const validUpdateDto: UpdateUserDto = {
      firstName: 'Johnny',
      lastName: 'Doe Updated',
      email: 'johnny.doe@example.com',
      isActive: false,
      profileId: '2',
    };

    it('should update an existing user with valid DTO', () => {
      mockProfilesService.findOne.mockReturnValue({ ...mockProfile, id: '2' });

      const result = service.update('1', validUpdateDto);

      expect(result.firstName).toBe(validUpdateDto.firstName);
      expect(result.lastName).toBe(validUpdateDto.lastName);
      expect(result.email).toBe(validUpdateDto.email);
      expect(result.isActive).toBe(validUpdateDto.isActive);
      expect(result.profileId).toBe(validUpdateDto.profileId);
    });

    it('should throw NotFoundException when user not found', () => {
      mockProfilesService.findOne.mockReturnValue(mockProfile);
      expect(() => service.update('999', validUpdateDto)).toThrow(NotFoundException);
    });

    it('should throw ConflictException when email already exists', () => {
      // Add another user to create email conflict
      (service as any).users.push({
        id: '2',
        firstName: 'Another',
        lastName: 'User',
        email: 'another@example.com',
        isActive: true,
        profileId: '1',
      });

      mockProfilesService.findOne.mockReturnValue(mockProfile);

      const conflictingUpdateDto: UpdateUserDto = {
        ...validUpdateDto,
        email: 'another@example.com', // Used email
      };

      expect(() => service.update('1', conflictingUpdateDto)).toThrow(ConflictException);
    });

    it('should throw NotFoundException when new profile not found', () => {
      const updateWithNewProfile: UpdateUserDto = {
        ...validUpdateDto,
        profileId: '999',
      };

      mockProfilesService.findOne.mockReturnValue(undefined);

      expect(() => service.update('1', updateWithNewProfile)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', () => {
      const initialLength = (service as any).users.length;
      
      service.remove('1');

      expect((service as any).users.length).toBe(initialLength - 1);
      expect(() => service.findOne('1')).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when user not found', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });

  describe('toggleStatus', () => {
    it('should toggle user active status', () => {
      const initialStatus = mockUser.isActive;

      const result = service.toggleStatus('1');

      expect(result.isActive).toBe(!initialStatus);
    });

    it('should throw NotFoundException when user not found', () => {
      expect(() => service.toggleStatus('999')).toThrow(NotFoundException);
    });
  });
});