import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Activity} from "@app/activity";

@Component({
  selector: 'app-activity-picker',
  templateUrl: './activity-picker.component.html',
  styleUrls: ['./activity-picker.component.css']
})
export class ActivityPickerComponent {
  @Input({required: true}) formGroup!: FormGroup
  items: ([Activity, string, string])[] = []

  constructor() {
    this.items = [
      [Activity.Minimal, 'Минимальная', 'Сидячая работа и нет физических нагрузок'],
      [Activity.Low, 'Низкая', 'Редкие, нерегулярные тренировки, активность в быту'],
      [Activity.Medium, 'Средняя', 'Тренировки 3-5 раз в неделю'],
      [Activity.High, 'Высокая', 'Тренировки 6-7 раз в неделю'],
      [Activity.Maximal, 'Очень высокая', 'Больше 6 тренировок в неделю и физическая работа'],
    ]
  }

}
