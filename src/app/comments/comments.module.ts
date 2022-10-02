import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentsComponent } from './comments-compenent/comments.component';
import { EditCommentComponent } from './edit-comment-dialog/edit-comment.component';
import { CommonModule } from '@angular/common';
import { DateCreatedPipe } from './date-created-pipe';
@NgModule({
  declarations: [
    CommentsComponent,
    EditCommentComponent,
    DateCreatedPipe
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ScrollingModule,
    MatInputModule
  ]
})
export class CommentsModule { }
