import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {IUser, Roles} from "../interfaces/user.interface";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {

    @Prop() password: string;

    @Prop() login: string

    @Prop() role: Roles

    // @Prop() id: string
}   export const UserSchema = SchemaFactory.createForClass(User);