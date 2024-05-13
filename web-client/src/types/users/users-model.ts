import { userId, userType } from "../shared-types";

//Data Transfer Object
export interface UserCreateDto {
  name: string;
  email: string;
  password: string; // pass will be hashed
  type: userType;
}

export interface userLoginData {
  email: string;
  password: string;
}

export class User {
  constructor(public name: string, public email: string, public id: userId) {}
}
