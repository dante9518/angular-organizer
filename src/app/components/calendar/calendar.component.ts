import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  public calendar: Week[];

  constructor(public dateService: DataService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  public generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while(date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const selected = now.isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');

          return {
            value, active, selected, disabled
          }
        })
      })
    }
    this.calendar = calendar;
  }

  public selectDay(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

}
