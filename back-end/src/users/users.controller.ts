import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Patch,
	Body,
	Param,
	HttpCode,
	HttpStatus,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(@Query('profileId') profileId?: string) {
		if (profileId) {
			return this.usersService.findByProfile(profileId);
		}
		
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Get('profile/:profileId')
	findByProfile(@Param('profileId') profileId: string) {
		return this.usersService.findByProfile(profileId);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string) {
		this.usersService.remove(id);
	}

	@Patch(':id/toggle-status')
	toggleStatus(@Param('id') id: string) {
		return this.usersService.toggleStatus(id);
	}
}