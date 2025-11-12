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
import {
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags,
	ApiParam,
	ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: 'Get all users or filter by profileId' })
	@ApiQuery({ name: 'profileId', required: false, type: String })
	@ApiResponse({ status: 200, description: 'List of users returned successfully.', type: [CreateUserDto] })
	findAll(@Query('profileId') profileId?: string) {
		if (profileId) {
			return this.usersService.findByProfile(profileId);
		}
		
		return this.usersService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a user by id' })
	@ApiParam({ name: 'id', required: true, description: 'User ID', type: String })
	@ApiResponse({ status: 200, description: 'User found and returned.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Get('profile/:profileId')
	@ApiOperation({ summary: 'Get users by profile id' })
	@ApiParam({ name: 'profileId', required: true, description: 'Profile ID to filter users', type: String })
	@ApiResponse({ status: 200, description: 'List of users for the profile returned successfully.' })
	findByProfile(@Param('profileId') profileId: string) {
		return this.usersService.findByProfile(profileId);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 201, description: 'User created successfully.' })
	@ApiResponse({ status: 400, description: 'Invalid request data.' })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update an existing user' })
	@ApiParam({ name: 'id', required: true, description: 'User ID', type: String })
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({ status: 200, description: 'User updated successfully.' })
	@ApiResponse({ status: 400, description: 'Invalid request data.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remove a user by id' })
	@ApiParam({ name: 'id', required: true, description: 'User ID', type: String })
	@ApiResponse({ status: 204, description: 'User removed successfully.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string) {
		this.usersService.remove(id);
	}

	@Patch(':id/toggle-status')
	@ApiOperation({ summary: 'Toggle a user active/inactive status' })
	@ApiParam({ name: 'id', required: true, description: 'User ID', type: String })
	@ApiResponse({ status: 200, description: 'User status toggled successfully.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	toggleStatus(@Param('id') id: string) {
		return this.usersService.toggleStatus(id);
	}
}