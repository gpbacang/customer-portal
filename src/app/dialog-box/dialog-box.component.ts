import { Component, OnInit, Input, OnChanges } from '@angular/core';

import $ from 'jquery';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit, OnChanges {
  @Input() onEditActivity: boolean;
  modalOptions: any;
  showModal: boolean;

  constructor() { }

  ngOnInit() {
    this.modalOptions = {
      'size': 'small',
      'type': 'default',
      'closeable': true
    };
    // $('.ui.modal').modal('show');
  }

  activeModal(): void {
    this.showModal = true;
  }

  cancel(): void {
    this.showModal = false;
    this.onEditActivity = false;
  }

  ngOnChanges(changes: any) {
    console.log(this.onEditActivity);
    if (this.onEditActivity === true) {
      this.showDialog();
    }
  }

  showDialog() {
    if (this.onEditActivity === true) {
      this.activeModal();
    }
    // this.activeModal();
  }

}
