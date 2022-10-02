import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommentsService } from '../comments.service';
import { IComment } from '../IComment';
import { IUser } from '../../users/IUser';
import { UsersService } from '../../users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCommentComponent } from '../edit-comment-dialog/edit-comment.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: IComment[];
  currentUser!: IUser;
  newCommentTxt!: string;

  constructor(private commentsService: CommentsService, private usersService: UsersService, public dialog: MatDialog){}
 
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.comments = JSON.parse(localStorage.getItem('commentsList')!);
    if (this.comments == null) {
      this.getComment(this.commentsService.commentsList);
    }
  }

  getComment(commentsList: IComment[]) {
    this.comments = commentsList.filter(x => x.deletedAt == null);
    const parentsComments = this.comments.filter(x => x.parentCommentId == null);
    this.comments = this.orderComments(parentsComments);
    localStorage.setItem('commentsList', JSON.stringify(this.comments));
  }

  orderComments(comments: IComment[]): IComment[] {
    comments = this.sortComments(comments);
    for (let index = 0; index < comments.length; index++) {
      comments[index].owneDetails = this.usersService.getUserDetails(comments[index].ownerId);
      comments[index].commentsArr = this.comments.filter(x => x.parentCommentId == comments[index].id)
      if (comments[index].commentsArr?.length != 0) {
        this.orderComments(comments[index].commentsArr!)
      }
    }
    return comments;
  }

  sortComments(comments: IComment[]) {
    return comments.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

  addComment(id?: number) {
    debugger;
    const comment: IComment = {
      id: 0, parentCommentId: id, ownerId: this.currentUser.id, txt: this.newCommentTxt, createdAt: new Date(), commentsArr: []
    }
    this.commentsService.addComment(comment);
    this.getComment(this.commentsService.commentsList);
  }

  deletComment(comment: IComment) {
    this.commentsService.deletComment(comment);
    this.getComment(this.commentsService.commentsList);
  }

  editComment(comment: IComment) {
    const dialogRef = this.dialog.open(EditCommentComponent, {
      data: { comment: comment.txt }, disableClose: true
    });
    dialogRef.afterClosed().subscribe((commentTxt) => {
      comment.txt = commentTxt;
      this.commentsService.editComment(comment);
      this.getComment(this.commentsService.commentsList);
    });
  }

}
