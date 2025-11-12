import {BadRequestException, Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../../shemas/user";
import {Model} from "mongoose";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {IResponseUser, IUser} from "../../interfaces/user.interface";
import {Request} from "express";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
        console.log('UsersService run');
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id): Promise<User | null> {
        return this.userModel.findById(id);
    }

    async sendUser(user: IUser): Promise<boolean> {
        const defaultRole = 'user'
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        // console.log('hashedPassword', hashedPassword);
        const newUser:IUser = {...user, password: hashedPassword, role: defaultRole};
        const userData = new this.userModel(newUser);
        userData.save();

        return Promise.resolve(true);
    }

    async updateUsers(id: string, user: IUser): Promise<User | null> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const hashUser = Object.assign({}, user, {password: hashedPassword});
        return this.userModel.findByIdAndUpdate(id, hashUser);
    }

    async deleteUsers() {
        return this.userModel.deleteMany()
    }

    async  deleteUserById(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id);
    }

    async checkAuthUser(login: string, password: string): Promise<IUser[]> {
        const usersArr = <IUser[]>await this.userModel
            .find<IUser>({login: login});
        if (usersArr.length === 0) {
            throw new BadRequestException("Логин указан неверно");
        }
        const isMatch: boolean = bcrypt.compareSync(password, usersArr[0].password);
        if (!isMatch) {
            throw new BadRequestException("Пароль указан неверно");
        }
        return Promise.resolve(usersArr);
    }

    async getUserByLogin(login: string): Promise<IUser | null > {
        return this.userModel.findOne({login});
    }

    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }

    async login(user: IUser) {
        const userFromDB = <IUser>await this.userModel.findOne({login: user.login});
        const payload = {login: user.login, password: user.password, role: userFromDB?.role, _id: userFromDB?._id};
        const userFromDb = await this.userModel.find({login: user.login});
        return {
            id: userFromDB._id,
            access_token: this.jwtService.sign(payload),
            role: userFromDB.role
        } as IResponseUser;
    }

    extractTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || !token) {
            throw new BadRequestException('Токен авторизации отсутствует или неверен');
        }
        return token;
    }
}

