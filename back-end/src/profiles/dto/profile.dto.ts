import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name: string;
}

export class UpdateProfileDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name: string;
}