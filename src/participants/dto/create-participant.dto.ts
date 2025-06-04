import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateParticipantDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase()?.trim())
  email: string;

  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @MinLength(2, {
    message: 'El nombre completo debe tener al menos 2 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre completo no puede exceder 100 caracteres',
  })
  @Transform(({ value }: { value: string }) => value?.trim())
  fullName: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Transform(({ value }: { value: string }) => value?.trim() || null)
  phone?: string;
}
