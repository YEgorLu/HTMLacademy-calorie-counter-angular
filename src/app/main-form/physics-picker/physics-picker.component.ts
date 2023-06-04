import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-physics-picker',
  templateUrl: './physics-picker.component.html',
  styleUrls: ['./physics-picker.component.css'],
})
export class PhysicsPickerComponent {
  @Input({required: true}) formGroup!: FormGroup;
  items: {id: string, label: string, unit: string}[] = [];

  constructor() {
    this.items = [
      {id: 'age', label: 'Возраст', unit: 'лет'},
      {id: 'height', label: 'Рост', unit: 'см'},
      {id: 'weight', label: 'Вес', unit: 'кг'},
    ]
  }
}
