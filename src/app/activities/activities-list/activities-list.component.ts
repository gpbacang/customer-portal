import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { DialogService } from '../../dialog/dialog.service';
// import { ActivitiesFormComponent } from '../activities-form/activities-form.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @Output() editActivity = new EventEmitter();
  @Output() deleteActivity = new EventEmitter();
  @Input() activities: any;

  constructor() { }

  ngOnInit() {
  }

  onEdit(activity: any) {
    this.editActivity.emit(activity);
    // this.dialogService.open(ActivitiesFormComponent, { title: 'Update Project', process: 'update', activity: activity });
  }

  onDelete(activity: any) {
    this.deleteActivity.emit(activity);
  }

}
