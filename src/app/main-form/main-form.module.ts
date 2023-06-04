import { NgModule } from '@angular/core';
import {AppComponent} from "@app/app.component";
import {MainFormComponent} from "@app/main-form/main-form.component";
import {ResultComponent} from "@app/result/result.component";
import {SpacedNumberPipe} from "@app/spaced-number.pipe";
import {GenderSwitchComponent} from "@app/main-form/gender-switch/gender-switch.component";
import {ActivityPickerComponent} from "@app/main-form/activity-picker/activity-picker.component";
import {PhysicsPickerComponent} from "@app/main-form/physics-picker/physics-picker.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    MainFormComponent,
    SpacedNumberPipe,
    GenderSwitchComponent,
    ActivityPickerComponent,
    PhysicsPickerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MainFormComponent,
    SpacedNumberPipe
  ],
  bootstrap: [MainFormComponent]
})
export class MainFormModule { }
