import { Component, inject, Input, OnInit } from '@angular/core';
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
  public data: { projectId: number, task?: Task } = inject(MAT_DIALOG_DATA);
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
    debugger;
    if (this.data.task) {
      this.taskUnderEdit = this.data.task;

      this.taskForm.patchValue({
        task_title: this.data.task?.task_title,
        task_type: this.data.task?.task_type,
        task_description: this.data.task?.task_description,
        priority: this.data.task?.priority,
        status: this.data.task?.status,
        effort: this.data.task?.effort,
        sprint_id: this.data.task?.sprint_id?? null,
        assignee_id: this.data.task?.assignee_id?? null,
      });

      this.newCommentForm.setValue({
        newComment: ''
      });

      if (this.taskUnderEdit.task_id === 1) {
        this.taskUnderEdit.comments = this.commentsTask1;
      }
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

  //Comments will be handled separately from Tasks as the Task endpoints don't accommodate complex objects
  addComment() {
    debugger;
    if (this.newCommentForm.get('newComment')?.value !== '') {
    //first need http request to add comment and return the new comments id, then push to array
    this.taskUnderEdit?.comments?.push(
      {comment_id: this.taskUnderEdit?.comments?.length + 1,
         task_id: this.taskUnderEdit.task_id, 
         comment_text: this.newCommentForm.get('newComment')?.value, 
         user_id: 1} as Comment);

      this.newCommentForm.reset();
    }
  }

  deleteComment(currentComment : Comment) {
    //will need to make http request here too to delete
    debugger;
    let newCommentList = this.taskUnderEdit.comments?.filter((c) => c.comment_id !== currentComment.comment_id );
    this.taskUnderEdit.comments = newCommentList;
  }

  sprintsProject1: Sprint[] = [
    { sprint_id: 1, sprint_name: 'Gather requirements', project_id: 1, start_date: new Date(2024, 6, 1), end_date: new Date(2024, 6, 12) },
    { sprint_id: 2, sprint_name: 'Project diagrams', project_id: 1, start_date: new Date(2024, 6, 15), end_date: new Date(2024, 6, 26) },
  ];

  commentsTask1: Comment[] = [{comment_id: 1, task_id: 1, comment_text: 'test comment 1', user_id: 1, },
    {comment_id: 2, task_id: 1, comment_text: 'test comment 2', user_id: 2, }]
 
  taskTypes: string[] = ['Feature','Bug'];

  priorities: string[] = ['Low','Medium','High','Critical'];

  taskStatuses: string[] = ['Backlog','Uncommitted','Developing','Testing','Complete'];

  availableUsers: User[] = [
    { user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com' },
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jdoe@test.com' },
    { user_id: 3, first_name: 'Hannibal', last_name: 'Lecter', email: 'hlecter@test.com'}
  ];


}
