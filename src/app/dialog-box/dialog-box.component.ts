import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Activities } from '../shared/activities';

declare var $: any;

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit, OnChanges {
  @Input() activity: Activities;
  @Input() showModal: boolean;
  @Output() hideModal = new EventEmitter();
  @Output() updateActivity = new EventEmitter();
  modalOptions: any;

  constructor() { }

  ngOnInit() {
    this.modalOptions = {
      'size': 'small',
      'type': 'default',
    };
  }

  cancel(): void {
    this.showModal = false;
    this.hideModal.emit();
  }

  ngOnChanges(changes: any) {
    if (this.showModal === true) {
      this.showModal = true;
      $('#activityName').val(this.activity.activity_name);
      $('#activityDate').val(this.activity.activity_date);
    }
  }

  update(name, date) {
    const activity = {
      'id': this.activity.id,
      'activity_name': name,
      'activity_date': date
    };
    this.updateActivity.emit(activity);
    this.cancel();
  }
}
