import { Controller, Post, Body, Req } from "@nestjs/common";
import { UserService } from "../service/User.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
}
