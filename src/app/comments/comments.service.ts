import { Injectable } from '@angular/core';
import { IComment } from './IComment';
import * as data from '../comment.json';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsList: IComment[] = (data as any).default;
  constructor() {}

  addComment(comment: IComment) {
    const commentId = this.commentsList.reduce((p, c) => p.id > c.id ? p : c).id + 1;
    comment.id = commentId;
    this.commentsList.push(comment);
  }

  editComment(comment: IComment) {
    const index = this.commentsList.map(x => x.id).indexOf(comment.id);
    this.commentsList[index].txt = comment.txt;
  }

  deletComment(comment: IComment) {
    const index = this.commentsList.map(x => x.id).indexOf(comment.id);
    this.commentsList[index].deletedAt = new Date();
    if (comment.commentsArr.length > 0) {
      for (let index = 0; index < comment.commentsArr.length; index++) {
        this.deletComment(comment.commentsArr[index]);
      }
    }
  }
}
