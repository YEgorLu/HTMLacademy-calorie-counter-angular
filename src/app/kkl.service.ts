import {Injectable} from '@angular/core';
import {Results} from "@app/results";
import {Activity} from "@app/activity";
import {Sex} from "@app/sex";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KklService {
  private readonly results$!: Subject<Results | undefined>;
  private baseFormulas!: Record<Sex, KklFormula>;
  private readonly formulas!: Formulas;

  private activityCoefs = {
    [Activity.Minimal]: 1.2,
    [Activity.Low]: 1.375,
    [Activity.Medium]: 1.55,
    [Activity.High]: 1.725,
    [Activity.Maximal]: 1.9
  } as const;

  private formula = (weight: number, height: number, age: number) => {
    return (10 * weight) + (6.25 * height) - (5 * age);
  }
  private maleFormula: KklFormula = (weight: number, height: number, age: number) => {
    return this.formula(weight, height, age) + 5;
  }
  private femaleFormula: KklFormula = (weight: number, height: number, age: number) => {
    return this.formula(weight, height, age) - 161;
  }

  private normMaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.baseFormulas.male(weight, height, age) * this.activityCoefs[activity];
  private normFemaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.baseFormulas.female(weight, height, age) * this.activityCoefs[activity];
  private minimalMaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.normMaleFormula(activity, weight, height, age) * 0.85;
  private minimalFemaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.normFemaleFormula(activity, weight, height, age) * 0.85;
  private maximalMaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.normMaleFormula(activity, weight, height, age) * 1.15;
  private maximalFemaleFormula: Formula = (activity: Activity, weight: number, height: number, age: number) => this.normFemaleFormula(activity, weight, height, age) * 1.15;

  constructor() {
    this.results$ = new Subject<Results | undefined>();

    this.baseFormulas = {
      [Sex.Male]: this.maleFormula,
      [Sex.Female]: this.femaleFormula,
    } as const;

    this.formulas = {
      norm: {
        [Sex.Male]: this.normMaleFormula,
        [Sex.Female]: this.normFemaleFormula
      },
      minimal: {
        [Sex.Male]: this.minimalMaleFormula,
        [Sex.Female]: this.minimalFemaleFormula
      },
      maximal: {
        [Sex.Male]: this.maximalMaleFormula,
        [Sex.Female]: this.maximalFemaleFormula
      }
    }
  }

  private descriptions: Record<keyof (typeof this.formulas), string> = {
    norm: 'поддержание веса',
    maximal: 'снижение веса',
    minimal: 'набор веса'
  };

  public getResults(): Subject<Results | undefined> {
    return this.results$
  }

  public setResults(activity: Activity, sex: Sex, age: number, weight: number, height: number): void {
    console.log({activity, sex, age, weight, height})
    const normKkl = this.formulas.norm[sex](activity, weight, height, age);
    const minimalKkl = this.formulas.minimal[sex](activity, weight, height, age);
    const maximalKkl = this.formulas.maximal[sex](activity, weight, height, age);

    this.results$.next({
      norm: {
        value: normKkl,
        description: this.descriptions.norm
      },
      minimal: {
        value: minimalKkl,
        description: this.descriptions.minimal
      },
      maximal: {
        value: maximalKkl,
        description: this.descriptions.maximal
      },
    })
  }

  public clearResults(): void {
    this.results$.next(undefined);
  }
}

type Formula = (activity: Activity, weight: number, height: number, age: number) => number;
type KklFormula = (weight: number, height: number, age: number) => number
type FormulasBySex = Record<Sex, Formula>;
type Formulas = {
  norm: FormulasBySex,
  minimal: FormulasBySex,
  maximal: FormulasBySex
};
