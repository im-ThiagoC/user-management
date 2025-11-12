import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Thiago', description: 'First name', minLength: 2 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Carvalho', description: 'Last name', minLength: 2 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @ApiProperty({ example: 'test.carvalho@example.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: true, description: 'User active status' })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '1', description: 'Profile ID reference' })
  @IsString()
  @IsNotEmpty()
  profileId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}