import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsBoolean()
	isActive: boolean;

	@IsString()
	@IsNotEmpty()
	profileId: string;
}

export class UpdateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsBoolean()
	isActive: boolean;

	@IsString()
	@IsNotEmpty()
	profileId: string;
}