import { Component, OnInit, Input, OnChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnChanges {
  @Input() onDeleteActivity: boolean;
  @Output() hideModal = new EventEmitter();
  modalOptions: any;
  showModal: boolean;

  constructor() { }

  ngOnInit() {
    this.modalOptions = {
      'size': 'small',
      'type': 'default',
      // 'closeable': true
    };
  }

  activeModal(): void {
    this.showModal = true;
  }

  cancel(): void {
    this.showModal = false;
    this.hideModal.emit();
  }

  ngOnChanges(changes: any) {
    if (this.onDeleteActivity === true) {
      this.showDialog();
    }
  }

  showDialog() {
    if (this.onDeleteActivity === true) {
      this.activeModal();
    }
  }

}
