import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {KklService} from "@app/kkl.service";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {Activity} from "@app/activity";
import {Sex} from "@app/sex";
import {isNumberValidator} from './validators/is-number-validator'
import {isActivityValidator, isSexValidator} from "@app/main-form/validators/is-type-validator";
import {Subscription} from "rxjs";
import {PrimitiveTypes} from "@angular/cli/src/analytics/analytics-parameters";

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormComponent implements OnDestroy {
  form!: FormGroup;
  clearDisabled = true;
  submitDisabled = true;
  private formSub!: Subscription;
  private initValues: FormValues = {
    sex: Sex.Male,
    age: 0,
    weight: 0,
    height: 0,
    activity: Activity.Minimal
  }
  constructor(
    protected kklService: KklService,
    private fb: FormBuilder
  ) {
    console.log('main-form constructor')

    this.form = fb.group({
      sex: [this.initValues.sex, isSexValidator()],
      age: [this.initValues.age, isNumberValidator()],
      height: [this.initValues.height, isNumberValidator()],
      weight: [this.initValues.weight, isNumberValidator()],
      activity: [this.initValues.activity, isActivityValidator()]
    })

    this.formSub = this.form.valueChanges
      .subscribe((v) => {
        let needDisableReset = true;
        let needEnableSubmit = true;

        Object.entries(v).forEach(([k, v], i) => {
          if (v !== this.initValues[k])
            needDisableReset = false;
          else if (k !== 'activity' && k !== 'sex') {
            needEnableSubmit = false
          }
        })

        this.submitDisabled = !needEnableSubmit;
        this.clearDisabled = needDisableReset;
      })
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

  clear() {
    this.kklService.clearResults();
    this.form.reset(this.initValues);
    this.submitDisabled = true;
    this.clearDisabled = true;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {
        activity,
        sex,
        age,
        weight,
        height
      } = this.form.value
      this.kklService.setResults(activity, sex, age, weight, height);
    }
  }


  protected readonly Sex = Sex;
}

interface FormValues {
  sex: Sex;
  age: number;
  weight: number;
  height: number;
  activity: Activity;
  [key: string]: Sex | number | Activity;
}
