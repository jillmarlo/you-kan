import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Sprint } from './models/sprint.model';
import { SprintService } from './services/sprint.service';
import { InputOption } from '../shared/input-option.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { Project } from '../projects/models/project.model';



@Component({
  selector: 'app-sprint-detail',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, 
    MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, TextFieldModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './sprint-detail.component.html',
  styleUrl: './sprint-detail.component.css'
})
export class SprintDetailComponent {
  readonly dialogRef = inject(MatDialogRef<SprintDetailComponent>);
  readonly sprintService = inject(SprintService);
 // readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  @Input() sprint!: Sprint;

  constructor() {}

  sprintForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    project: new FormControl<number | null>(null, [Validators.required ]),
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
 });

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    // if (this.taskForm.valid) {
    //   const task: Task = {
    //     name: this.taskForm.get('name').value,
    //     typeId: this.taskForm.get('type').value,
    //     priorityId: this.taskForm.get('priority').value,
    //     description: this.taskForm.get('description').value,
    //     statusId: this.taskForm.get('status').value,
    //     assigneeId: this.taskForm.get('assignee').value,
    //     creatorId: this.taskForm.get('creator').value,
    //   };

    //   this.taskService.createTask(task).subscribe((task) => {
    //     console.log('Added task:', task);
    //   });
    // }
  }

  currentProject: InputOption[] = [
    {value: 0, name: "Current Project Placeholder"}
  ];

  // priorities: InputOption[] = [
  //   {value: 0, name: 'Low'},
  //   {value: 1, name: 'Medium'},
  //   {value: 2, name: 'High'},
  //   {value: 2, name: 'Critical'},
  // ];

  // statuses: InputOption[] = [
  //   {value: 0, name: 'Uncommitted'},
  //   {value: 1, name: 'Developing'},
  //   {value: 2, name: 'Developed'},
  //   {value: 3, name: 'Testing'},
  //   {value: 4, name: 'Complete'},
  // ];

}
