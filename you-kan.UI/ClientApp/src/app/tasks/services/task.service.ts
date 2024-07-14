import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskType } from '../models/task-type.enum';
import { Priority } from '../models/priority.enum';
import { TaskStatus } from '../models/task-status.enum';
import { User } from '../../user-management/models/user.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  //mock user objects until back end is hooked up
  users: User[] = [
    {
      id: 1,
      name: 'User name 1',
      tasks: []
    },
    {
        id: 2,
        name: 'User name 2',
        tasks: []
      }
  ];

  //mock task objects until back end is hooked up 
  tasks: Task[] = [
    {
      name: 'Task 1',
      type: TaskType.Feature,
      priority: Priority.Medium,
      description:
        'Test description for task 1, blah blah blah',
      status: TaskStatus.Uncommitted,
      assignee: this.users[0],
      creator: this.users[1],
      comments: [],
      effort: 1
    },
    {
      name: 'Task 1',
      type: TaskType.Feature,
      priority: Priority.Medium,
      description:
            'Test description for task 2, blah blah blah blah blah blah blah blah blah blah blah blah',
      status: TaskStatus.Uncommitted,
      assignee: this.users[1],
      creator: this.users[0],
      comments: [],
      effort: 1
    },
  ];
}