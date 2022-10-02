import {Component, Inject,OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  commentValue!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {comment: string},public dialogRef: MatDialogRef<EditCommentComponent>) 
   {
   this.commentValue = data.comment;
   }
  ngOnInit(): void {
  }

}
