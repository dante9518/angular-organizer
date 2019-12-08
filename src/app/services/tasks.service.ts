import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { TouchSequence } from 'selenium-webdriver';

export interface Task {
    id?: string,
    title: string,
    date?: string
}

export interface CreateRes {
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    static url = 'https://angular-practice-calenda-e9647.firebaseio.com/tasks';

    constructor(private http: HttpClient){}

    public load(date: moment.Moment): Observable<Task[]> {
        return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
                        .pipe(map((tasks) => {
                            if(!tasks){
                                return []
                            }
                            return Object.keys(tasks).map((key) => ({...tasks[key], id: key}))
                        }))
    }

    public create(task: Task): Observable<Task>{
        return this.http.post<CreateRes>(`${TasksService.url}/${task.date}.json`, task)
                        .pipe(map((res) => {
                            return {...task, id: res.name}
                        }));
    }

    public remove(task: Task): Observable<void>{
        return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`);
    }
}