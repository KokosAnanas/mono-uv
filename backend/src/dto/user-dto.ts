import {IUser} from "../interfaces/user.interface";
import {IsNotEmpty} from "class-validator";

export class UserDto implements IUser {
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    login: string;
}
