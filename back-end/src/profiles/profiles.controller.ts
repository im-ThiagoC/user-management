import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	@Get()
	findAll() {
		return this.profilesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		if(!id) { return { error: 'Profile ID is required' }; }
		
		const profile = this.profilesService.findOne(id);
		if(!profile) {
			return { error: 'Profile not found' };
		}
		return profile;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createProfileDto: CreateProfileDto) {
		return this.profilesService.create(createProfileDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
		return this.profilesService.update(id, updateProfileDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string) {
		this.profilesService.remove(id);
	}
}