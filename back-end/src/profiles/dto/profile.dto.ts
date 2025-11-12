import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProfileDto {
	@ApiProperty({ example: 'Admin', minLength: 2 })
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}