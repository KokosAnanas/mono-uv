import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post, Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {NoticesService} from "../../services/notices/notices.service";
import {JwtAuthGuard} from "../../services/authentication/jwt-auth.guard/jwt-auth.guard.service";
import {ValidationParamIdPipe} from "../../pipes/param.pipe";
import {INotice} from "../../interfaces/notice.interface";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {NoticeDto} from "../../dto/notice-dto";

@Controller('notices')
export class NoticesController {

    constructor(private noticesService: NoticesService) {
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('photos', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (_req, file, cb) =>
                    cb(null, `${Date.now()}-${file.originalname}`),
            }),
        }),
    )
    async create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('notice') raw: string,
    ) {
        try {
            const dto: NoticeDto = JSON.parse(raw);
            dto.photos = (files ?? []).map(f => f.filename);
            return await this.noticesService.uploadNotice(dto);
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException('Failed to save notice');
        }
    }

    @Post('seed')
    initNotices() {
        return this.noticesService.generateNotices();
    }

    @Delete()
    removeAllNotices(): void {
        this.noticesService.deleteNotices();
    }

    @Delete(':noticeNum')
    async removeNotice(@Param('noticeNum') noticeNum: string): Promise<void> {
        await this.noticesService.deleteNoticeByNum(noticeNum);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllNotices() {
        return this.noticesService.getAllNotices();
    }

    @Get(':id')
    getNoticeById(@Param('id', ValidationParamIdPipe) id: string): Promise<INotice | null> {
        return this.noticesService.getNoticeById(id)
    }

    @Put(':noticeNum')
    @UseInterceptors(
        FilesInterceptor('photos', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
            }),
        }),
    )
    async update(
        @Param('noticeNum') noticeNum: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body('notice') raw: string,
    ) {
        const dto: NoticeDto = JSON.parse(raw);
        const newNames = (files ?? []).map(f => f.filename);
        dto.photos = Array.from(new Set([...dto.photos, ...newNames]));

        return this.noticesService.updateNotice(noticeNum, dto);
    }
}

