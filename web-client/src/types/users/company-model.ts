import { Contacts } from "../contacts-model";
import { userId } from "../shared-types";
import { User, UserCreateDto } from "./users-model";

export class Company extends User {
  constructor(
    data: UserCreateDto,
    id: userId,
    public industry?: string,
    public location?: string,
    public contacts?: Contacts
  ) {
    super(data.name, data.email, id);
  }
}
