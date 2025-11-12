import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { randomUUID } from 'crypto';
import { USERS_MOCK } from './users.mock';

@Injectable()
export class UsersService {
	private users: User[] = USERS_MOCK;

	constructor(private readonly profilesService: ProfilesService) {}

	findAll(): User[] {
		return [...this.users];
	}

	findOne(id: string): User {
		const user = this.users.find((u) => u.id === id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	findByProfile(profileId: string): User[] {
		// Validate that profile exists
		const profile = this.profilesService.findOne(profileId);
		if (!profile) {
			throw new NotFoundException(`Profile with ID ${profileId} not found`);
		}

		return this.users.filter((u) => u.profileId === profileId);
	}

	create(createUserDto: CreateUserDto): User {
		// Validate that profile exists
		const profile = this.profilesService.findOne(createUserDto.profileId);

		if (!profile) {
			throw new NotFoundException(`Profile with ID ${createUserDto.profileId} not found`);
		}

		// Check if email already exists
		const existingUser = this.users.find(
			(u) => u.email.toLowerCase() === createUserDto.email.toLowerCase(),
		);
		
		if (existingUser) {
			throw new ConflictException(`User with email "${createUserDto.email}" already exists`);
		}

		const newUser = new User(
			randomUUID().toString(),
			createUserDto.firstName,
			createUserDto.lastName,
			createUserDto.email,
			createUserDto.isActive,
			createUserDto.profileId,
		);

		this.users.push(newUser);
		return newUser;
	}

	update(id: string, updateUserDto: UpdateUserDto): User {
		const userIndex = this.users.findIndex((u) => u.id === id);
		
		if (userIndex === -1) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		if(updateUserDto.profileId) {
			// Validate that profile exists
			const profile = this.profilesService.findOne(updateUserDto.profileId);
			if (!profile) {
				throw new NotFoundException(`Profile with ID ${updateUserDto.profileId} not found`);
			}
		}

		if(updateUserDto.email) {
			// Check if email conflicts with existing user
			const existingUser = this.users.find(
				(u) =>
					updateUserDto.email !== undefined &&
					u.email.toLowerCase() === updateUserDto.email.toLowerCase() &&
					u.id !== id,
			);
			
			if (existingUser) {
				throw new ConflictException(`User with email "${updateUserDto.email}" already exists`);
			}
		}

		// Update the user
		this.users[userIndex] = {
			...this.users[userIndex],
			...updateUserDto,
		};

		return this.users[userIndex];
	}

	remove(id: string): void {
		const userIndex = this.users.findIndex((u) => u.id === id);
		
		if (userIndex === -1) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		this.users.splice(userIndex, 1);
	}

	toggleStatus(id: string): User {
		const user = this.findOne(id);
		user.isActive = !user.isActive;
		return user;
	}
}