import { Contacts } from "../contacts-model";
import { userId } from "../shared-types";
import { User, UserCreateDto } from "./users-model";

export class Developer extends User {
  constructor(
    data: UserCreateDto,
    id: userId,
    public profileImage?: string | null,
    public bio?: string | null,
    public rating?: number | null,
    public address?: string | null,
    public contacts?: Contacts | null
  ) {
    super(data.name, data.email, id);
  }
}
