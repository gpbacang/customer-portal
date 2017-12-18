import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activities } from '../shared/activities';

// import { DialogService } from '../../dialog/dialog.service';
// import { ActivitiesFormComponent } from '../activities-form/activities-form.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @Output() updateactivity = new EventEmitter();
  @Output() hidemodal = new EventEmitter();
  @Input() activities: any;
  showModal = false;
  selectedActivity: Activities;

  constructor() { }

  ngOnInit() {
  }

  onEdit(activity: any) {
    this.selectedActivity = activity;
    this.showModal = true;
  }

  updateActivity(event) {
    this.updateactivity.emit(event);
  }

  hideModal(event) {
    this.showModal = false;
  }

}
