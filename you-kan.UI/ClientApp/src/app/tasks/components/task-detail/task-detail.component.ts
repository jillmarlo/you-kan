import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../../user-management/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Sprint } from '../../../sprints/models/sprint.model';
import { Comment } from '../../models/comment.model';
import { SprintService } from '../../../sprints/services/sprint.service';
import { CommentService } from '../../services/comment.service';
import { UsersService } from '../../../user-management/components/users/users.service';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, 
    MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, TextFieldModule, MatListModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  private fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  readonly taskService = inject(TaskService);
  readonly sprintService = inject(SprintService);
  readonly commentService = inject(CommentService);
  readonly userService = inject(UsersService);
  
  public data: { projectId: number, task?: Task } = inject(MAT_DIALOG_DATA);

  //ideally these would be in a reference table and we would use Ids insted of magic strings
  taskTypes: string[] = ['Feature','Bug'];
  taskEfforts: number[] = [1,2,3,4,5]
  priorities: string[] = ['Low','Medium','High','Critical'];
  taskStatuses: string[] = ['Backlog','Committed','Developing','Testing','Complete'];
  sprintsForProject!: Sprint[];
  usersForProject!: User[];

  @Output() taskDeleted = new EventEmitter();

  taskForm: FormGroup;
  newCommentForm: FormGroup;
  taskUnderEdit!: Task;

  constructor() {
    this.taskForm = this.fb.group({
      task_title: [null, Validators.required],
      task_type: [null, Validators.required],
      task_description: [null],
      priority: [null, Validators.required],
      status: [null, Validators.required],
      effort: [null, Validators.required],
      sprint_id: [null],
      assignee_id: [null],
    });

    this.newCommentForm = this.fb.group({
      newComment: ['']
    });
  }


  ngOnInit() {
    if (this.data.task) {
      this.taskUnderEdit = this.data.task;

      this.taskForm.patchValue({
        task_title: this.data.task?.task_title,
        task_type: this.data.task?.task_type,
        task_description: this.data.task?.task_description,
        priority: this.data.task?.priority,
        status: this.data.task?.status,
        effort: this.data.task?.effort,
        sprint_id: this.data.task?.sprint_id ?? null,
        assignee_id: this.data.task?.assignee_id ?? null,
      });

      this.newCommentForm.setValue({
        newComment: ''
      });

      //get comments for task
      // this.commentService.getCommentsForTask(this.taskUnderEdit.task_id)
      // .subscribe((comments) => {
      //    this.taskUnderEdit.comments = comments})
      

      this.sprintService.getSprints(this.data.projectId).subscribe((sprints) => {
        this.sprintsForProject = sprints;
      })

      this.userService.getUsers().subscribe((users) => {
        this.usersForProject = users.data;
      })

    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value); 
    }
    //   this.taskService.createTask(task).subscribe((task) => {
    //     console.log('Added task:', task);
    //   });
    // }
  }

  deleteTask(): void {
    this.dialogRef.close(this.taskUnderEdit.task_id);
  }
  

  //Comments will be handled separately from Tasks as the Task endpoints don't accommodate complex objects
  addComment() {
    debugger;
    if (this.newCommentForm.get('newComment')?.value !== '') {
    //first need http request to add comment and return the new comments id, then push to array
    this.taskUnderEdit?.comments?.push(
      {
         task_id: this.taskUnderEdit.task_id, 
         comment_text: this.newCommentForm.get('newComment')?.value} as Comment);

      this.newCommentForm.reset();
    }
  }

  deleteComment(currentComment : Comment) {
    //will need to make http request here too to delete
    debugger;
    let newCommentList = this.taskUnderEdit.comments?.filter((c) => c.comment_id !== currentComment.comment_id );
    this.taskUnderEdit.comments = newCommentList;
  }

  commentsTask1: Comment[] = [{comment_id: 1, task_id: 1, comment_text: 'test comment 1', user_id: 1, },
    {comment_id: 2, task_id: 1, comment_text: 'test comment 2', user_id: 2, }]
 


}
