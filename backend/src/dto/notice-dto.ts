import {INotice, INoticeViolation} from "../interfaces/notice.interface";

export class NoticeDto implements INotice {
    orgName:    string;
    noticeNum:  string;
    noticeDate: Date;
    toWhom:     string;
    copyTo:     string;
    specialist: string;
    present:    string;
    objectName: string;
    workType:   string;
    violations: INoticeViolation[] = [];
    actions:    string;
    contacts:   string;
    photos: string[];

    constructor(init?: Partial<INotice>) {
        Object.assign(this, init);
    }
}
