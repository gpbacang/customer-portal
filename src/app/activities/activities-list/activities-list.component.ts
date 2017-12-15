import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { DialogService } from '../../dialog/dialog.service';
// import { ActivitiesFormComponent } from '../activities-form/activities-form.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @Output() editActivity = new EventEmitter();

  constructor(
    // private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  onEdit() {
    this.editActivity.emit();
    // this.dialogService.open(ActivitiesFormComponent, { title: 'Update Project', process: 'update', activity: activity });
  }

}
