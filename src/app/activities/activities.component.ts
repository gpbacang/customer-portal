import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  @Input() onEditActivity: boolean;
  @Input() onDeleteActivity: boolean;
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = 'pie';
  activities: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('http://sycophantic-hand.000webhostapp.com/getData.php').subscribe(data => {
      this.activities = data;
    });

    this.onEditActivity = false;
  }

  showModal(activity: any) {
    console.log(activity);
    this.onEditActivity = true;
  }

  hideModal(event) {
    this.onEditActivity = false;
  }

  hideConfirmation(event) {
    this.onDeleteActivity = false;
  }

  deleteActivity(event) {
    this.onDeleteActivity = true;
  }

}
