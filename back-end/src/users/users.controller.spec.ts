import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

// Mock data
const mockUser = {
  id: 'mock-uuid-1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@controller.com',
  isActive: true,
  profileId: '1',
};

const mockUsersService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByProfile: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  toggleStatus: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('DTO Validation', () => {
    it('should validate CreateUserDto with valid data', async () => {
      const dto = new CreateUserDto();
      dto.firstName = 'John';
      dto.lastName = 'Doe';
      dto.email = 'john.doe@example.com';
      dto.isActive = true;
      dto.profileId = '1';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should invalidate CreateUserDto with invalid email', async () => {
      const dto = new CreateUserDto();
      dto.firstName = 'John';
      dto.lastName = 'Doe';
      dto.email = 'invalid-email';
      dto.isActive = true;
      dto.profileId = '1';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });

    it('should invalidate CreateUserDto with short firstName', async () => {
      const dto = new CreateUserDto();
      dto.firstName = 'J'; // Muito curto
      dto.lastName = 'Doe';
      dto.email = 'john@example.com';
      dto.isActive = true;
      dto.profileId = '1';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('firstName');
    });

    it('should validate UpdateUserDto with partial data', async () => {
      const dto = new UpdateUserDto();
      dto.firstName = 'Updated';
      dto.lastName = 'User';
      dto.email = 'updated@example.com';
      dto.isActive = false;
      dto.profileId = '2';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('findAll', () => {
    it('should call findAll method of service when no profileId is provided', () => {
      mockUsersService.findAll.mockReturnValue([mockUser]);

      const result = controller.findAll(undefined);

      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(mockUsersService.findByProfile).not.toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });

    it('should call findByProfile method of service when profileId is provided', () => {
      mockUsersService.findByProfile.mockReturnValue([mockUser]);
      const profileId = '2';

      const result = controller.findAll(profileId);

      expect(mockUsersService.findByProfile).toHaveBeenCalledWith(profileId);
      expect(mockUsersService.findAll).not.toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user and call findOne on service', () => {
      mockUsersService.findOne.mockReturnValue(mockUser);

      const result = controller.findOne(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(mockUser.id);
    });

    it('should let NotFoundException propagate when user not found', () => {
      mockUsersService.findOne.mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      expect(() => controller.findOne('unknown-id')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const validCreateDto: CreateUserDto = {
      firstName: 'New',
      lastName: 'User',
      email: 'new@controller.com',
      isActive: true,
      profileId: '1',
    };

    it('should create a user with valid DTO', () => {
      mockUsersService.create.mockReturnValue(mockUser);

      const result = controller.create(validCreateDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(validCreateDto);
    });

    it('should let ConflictException propagate when email already exists', () => {
      mockUsersService.create.mockImplementation(() => {
        throw new ConflictException('Email already exists');
      });

      expect(() => controller.create(validCreateDto)).toThrow(ConflictException);
    });

    it('should let NotFoundException propagate when profile not found', () => {
      mockUsersService.create.mockImplementation(() => {
        throw new NotFoundException('Profile not found');
      });

      expect(() => controller.create(validCreateDto)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const validUpdateDto: UpdateUserDto = {
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated@example.com',
      isActive: false,
      profileId: '2',
    };

    it('should update a user with valid DTO', () => {
      const updatedUser = { ...mockUser, ...validUpdateDto };
      mockUsersService.update.mockReturnValue(updatedUser);

      const result = controller.update(mockUser.id, validUpdateDto);

      expect(result).toEqual(updatedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(mockUser.id, validUpdateDto);
    });

    it('should let NotFoundException propagate when user not found', () => {
      mockUsersService.update.mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      expect(() => controller.update('unknown-id', validUpdateDto)).toThrow(NotFoundException);
    });
  });

  describe('toggleStatus', () => {
    it('should toggle user active status', () => {
      const toggledUser = { ...mockUser, isActive: !mockUser.isActive };
      mockUsersService.toggleStatus.mockReturnValue(toggledUser);

      const result = controller.toggleStatus(mockUser.id);

      expect(result).toEqual(toggledUser);
      expect(mockUsersService.toggleStatus).toHaveBeenCalledWith(mockUser.id);
    });

    it('should let NotFoundException propagate when user not found', () => {
      mockUsersService.toggleStatus.mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      expect(() => controller.toggleStatus('unknown-id')).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call remove on service and return undefined', () => {
      mockUsersService.remove.mockImplementation(() => {});

      const result = controller.remove(mockUser.id);

      expect(result).toBeUndefined();
      expect(mockUsersService.remove).toHaveBeenCalledWith(mockUser.id);
    });

    it('should let NotFoundException propagate when user not found', () => {
      mockUsersService.remove.mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      expect(() => controller.remove('unknown-id')).toThrow(NotFoundException);
    });
  });
});