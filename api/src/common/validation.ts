import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString as IsStringInternal,
  IsNumber as IsNumberInternal,
  IsEnum as IsEnumInternal,
  IsBoolean as IsBooleanInternal,
  IsDate as IsDateInternal,
  IsEmail as IsEmailInternal,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export const IsString = () =>
  applyDecorators(IsStringInternal(), ApiProperty());

export const IsEmail = () => applyDecorators(IsEmailInternal(), ApiProperty());

export const IsNumber = () =>
  applyDecorators(IsNumberInternal(), ApiProperty());

export const IsEnum = <T extends object>(enumType: T) =>
  applyDecorators(IsEnumInternal(enumType), ApiProperty());

export const IsBoolean = () =>
  applyDecorators(IsBooleanInternal(), ApiProperty());

export const IsDate = () => applyDecorators(IsDateInternal(), ApiProperty());

export const IsOfType = <T extends object>(Cls: new () => T) =>
  applyDecorators(
    ValidateNested(),
    Type(() => Cls),
    ApiProperty({ type: Cls }),
  );

export const IsArrayOfType = <T extends object>(Cls: new () => T) =>
  applyDecorators(
    ValidateNested({ each: true }),
    Type(() => Cls),
    ApiProperty({ type: Cls, isArray: true }),
  );

export const IsArrayOfStrings = () =>
  applyDecorators(
    ValidateNested({ each: true }),
    IsStringInternal(),
    ApiProperty({ type: String, isArray: true }),
  );

export const IsOptionalString = () =>
  applyDecorators(
    IsOptional(),
    IsStringInternal(),
    ApiProperty({ nullable: true, type: String }),
  );
