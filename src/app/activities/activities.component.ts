import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  @Input() onEditActivity: boolean;
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
    this.onEditActivity = false;
  }

  showModal(event) {
    this.onEditActivity = true;
  }

  hideModal(event) {
    this.onEditActivity = false;
  }

}
