import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = 'pie';
  onEditActivity: boolean;

  constructor() { }

  ngOnInit() {
  }

  editActivity(event) {
    this.onEditActivity = true;
  }

}
