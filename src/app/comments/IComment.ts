import { IUser } from "../users/IUser"

export interface IComment
{
    id: number,
    parentCommentId?: number,
    ownerId: number,
    txt: string,
    createdAt: Date,
    deletedAt?: Date
    owneDetails?:IUser,
    commentsArr:IComment[],
    addYourComment?:boolean
}