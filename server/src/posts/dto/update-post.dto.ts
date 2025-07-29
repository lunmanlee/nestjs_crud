import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Content must be a string' })
  @MaxLength(5000, { message: 'Content must not exceed 5000 characters' })
  content?: string;

  @IsOptional()
  @IsBoolean({ message: 'Published must be a boolean' })
  published?: boolean;
}