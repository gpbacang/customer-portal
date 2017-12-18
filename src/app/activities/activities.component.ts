import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Activities } from '../shared/activities';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  @Input() onEditActivity: boolean;
  @Input() onDeleteActivity: boolean;
  pieChartLabels: string[] = ['Activity 1', 'Activity 2', 'Activity 3'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = 'pie';
  activity: Activities;
  activities: Activities[] = [
    {
      id: 1,
      activity_name: 'This is a test activity',
      activity_date: '2017-12-20'
    },
    {
      id: 2,
      activity_name: 'This is a test activity 2',
      activity_date: '2017-12-18'
    },
    {
      id: 3,
      activity_name: 'This is a test activity 3',
      activity_date: '2017-12-25'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onEditActivity = false;
  }

  showModal(activity: Activities) {
    this.onEditActivity = true;
    this.activity = activity;
  }

  hidemodal(event) {
    this.onEditActivity = false;
  }

  hideConfirmation(event) {
    this.onDeleteActivity = false;
  }

  deleteActivity(event) {
    this.onDeleteActivity = true;
  }

  updateactivity(event: Activities) {
    this.activities[event.id - 1] = {
      'id': event.id,
      'activity_name': event.activity_name,
      'activity_date': event.activity_date
    };
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
