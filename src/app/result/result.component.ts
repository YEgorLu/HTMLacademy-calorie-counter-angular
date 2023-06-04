import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Results} from "@app/results";
import {KklService} from "@app/kkl.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
  results?: Subject<Results | undefined>;

  constructor(
    private kklService: KklService
  ) {
  }

  ngOnInit() {
    this.results = this.kklService.getResults();
  }
}
