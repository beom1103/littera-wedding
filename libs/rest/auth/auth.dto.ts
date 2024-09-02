import { User } from "../user/user.dto";
import { Request } from "express";

export enum AuthProvider {
  Naver = "naver",
  Kakao = "kakao",
}

export interface BaseActant {
  ipAddress: string;
  userAgent: string;
}

export interface AuthRequest extends Request {
  user?: User;
  authInfo?: AuthInfo;
}

export interface AuthResponse {
  accessToken: string;
}

interface AuthInfo {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRequest extends Request {
  user?: User;
  authInfo?: AuthInfo;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  name: string;
}
