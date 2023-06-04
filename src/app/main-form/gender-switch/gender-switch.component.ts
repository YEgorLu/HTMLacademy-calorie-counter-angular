import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Sex} from "@app/sex";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-gender-switch',
  templateUrl: './gender-switch.component.html',
  styleUrls: ['./gender-switch.component.css']
})
export class GenderSwitchComponent{
  @Input({required: true}) formGroup!: FormGroup;
  items: ([Sex, string])[] = [];
  changedValue: Sex | undefined;

  constructor() {
    this.items = [
      [Sex.Male, 'Мужчина'],
      [Sex.Female, 'Женщина']
    ]
  }

}
