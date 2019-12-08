import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    public changeMonth(dir: number) {
        let value = this.date.value.add(dir, 'month');
        this.date.next(value);
    }

    public changeDate(date: moment.Moment) {
        const value = this.date.value.set({
            date: date.date(),
            month: date.month()
        })
        this.date.next(value);
    }
}