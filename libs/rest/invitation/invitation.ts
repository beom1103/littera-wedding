import {
  WeddingInvitationSection,
  WeddingSectionType,
} from "../wedding/wedding";

// 기본 타입 정의
export enum InvitationType {
  Wedding = "wedding",
}

export type InvitationTypeMap = {
  [InvitationType.Wedding]: WeddingSectionType;
};

// 기본 섹션 인터페이스
export interface BaseSection<T extends InvitationType> {
  id: string;
  type: InvitationTypeMap[T];
  isAvailable: boolean;
  order: number;
}

type InvitationSectionMap = {
  [InvitationType.Wedding]: WeddingInvitationSection;
};

export interface Invitation<T extends InvitationType> {
  id: number;
  type: T;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  sections: InvitationSectionMap[T][];
}
