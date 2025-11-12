import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Notice, NoticeSchema} from "../../shemas/notice";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../static/privat/constants";
import {NoticesController} from "./notices.controller";
import {NoticesService} from "../../services/notices/notices.service";
import {JwtStrategyService} from "../../services/authentication/jwt-strategy/jwt-strategy.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret
        })],
    controllers: [NoticesController],
    providers: [NoticesService, JwtStrategyService],
})
export class NoticesModule {}
