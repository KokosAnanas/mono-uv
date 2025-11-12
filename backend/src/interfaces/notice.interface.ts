export interface INotice {
    orgName:    string;
    noticeNum:  string;
    noticeDate: Date;
    toWhom:     string;
    copyTo:     string;
    specialist: string;
    present:    string;
    objectName: string;
    workType:   string;
    violations: INoticeViolation[];
    actions:    string;
    contacts:   string;
    photos: string[];
}

export interface INoticeViolation {
    place: string;
    element: string;
    subject: string;
    norm: string;
    deadline: Date;
    note: string;
}