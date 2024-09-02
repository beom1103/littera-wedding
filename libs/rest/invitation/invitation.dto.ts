import {
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { InvitationType } from "./invitation";

export class CreateSectionDto {
  @IsString()
  type: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  order: number;

  @IsObject()
  content: any;
}

export class CreateAssetDto {
  @IsNumber()
  cardId: number;

  @IsString()
  category: string;

  @IsString()
  fileId: string;

  @IsString()
  originFile: string;

  @IsString()
  thumbFile: string;

  @IsNumber()
  sequence: number;

  @IsBoolean()
  selected: boolean;
}

export class CreateInvitationRequest {
  @IsEnum(InvitationType)
  type: InvitationType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets: CreateAssetDto[];
}

export class UpdateInvitationRequest {
  @IsOptional()
  @IsEnum(InvitationType)
  type?: InvitationType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections?: CreateSectionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets?: CreateAssetDto[];
}

export class InvitationResponse {
  @IsString()
  id: string;

  @IsEnum(InvitationType)
  type: InvitationType;

  @IsString()
  userId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets: CreateAssetDto[];
}

export class DeleteInvitationResponse {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;
}
