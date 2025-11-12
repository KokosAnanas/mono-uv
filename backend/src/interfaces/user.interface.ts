
export type Roles  = 'admin' | 'user'
import * as mongoose from "mongoose";

export interface IUser {
    password: string;
    login: string,
    role?: Roles,
    _id?: string
}

export interface IResponseUser {
    id: string;
    access_token: string;
    role: Roles
}
