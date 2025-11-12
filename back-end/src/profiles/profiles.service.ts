import {
	Injectable,
	NotFoundException,
	ConflictException,
} from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { randomUUID } from 'crypto';
import { PROFILES_MOCK } from './profiles.mock';

@Injectable()
export class ProfilesService {
	private profiles: Profile[] = PROFILES_MOCK;

	findAll(): Profile[] {
		return this.profiles;
	}

	findOne(id: string): Profile {
		const profile = this.profiles.find((p) => p.id === id);
		if (!profile) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}
		return profile;
	}

	create(createProfileDto: CreateProfileDto): Profile {
		// Check if profile name already exists
		const existingProfile = this.profiles.find(
			(p) => p.name.toLowerCase() === createProfileDto.name.toLowerCase(),
		);
		
		if (existingProfile) {
			throw new ConflictException(`Profile with name "${createProfileDto.name}" already exists`);
		}

		const newProfile = new Profile(
			randomUUID(),
			createProfileDto.name,
		);
		
		this.profiles.push(newProfile);
		return newProfile;
	}

	update(id: string, updateProfileDto: UpdateProfileDto): Profile {
		const profileIndex = this.profiles.findIndex((p) => p.id === id);
		
		if (profileIndex === -1) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}

		// Check if new name conflicts with existing profile
		let existingProfile: Profile | undefined;
		if (updateProfileDto.name) {
			existingProfile = this.profiles.find(
				(p) => p.id !== id && p.name.toLowerCase() === updateProfileDto.name!.toLowerCase(),
			);
		}
		
		if (existingProfile) {
			throw new ConflictException(`Profile with name "${updateProfileDto.name}" already exists`);
		}

		if (updateProfileDto.name !== undefined) {
			this.profiles[profileIndex].name = updateProfileDto.name;
		}
		return this.profiles[profileIndex];
	}

	remove(id: string): void {
		const profileIndex = this.profiles.findIndex((p) => p.id === id);
		
		if (profileIndex === -1) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}

		this.profiles.splice(profileIndex, 1);
	}
}