import { Component, OnInit } from '@angular/core';
import { FormGroupName, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { TasksService, Task } from 'src/app/services/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form: FormGroup;
  public tasks: Task[] = [];
  constructor(private fb: FormBuilder,
              private dateService: DataService,
              private taskService: TasksService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    })

    this.form = this.fb.group({
      title: ['', Validators.required]
    })
  }

  public submit() {
    const title = this.form.value.title;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(taks => {
      this.form.reset();
    }, err => console.error(err));

    console.log(this.form.value.title);
  }

  public remove(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    })
  }

}
