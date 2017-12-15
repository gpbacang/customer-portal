import { Component, OnInit, Input, OnChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';

// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() onEditActivity: boolean;
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

  ngAfterViewInit() {
    // $('.ui.selection.dropdown').dropdown();
  }

  activeModal(): void {
    this.showModal = true;
    $('.ui.selection.dropdown').dropdown();
    $('#example1').calendar({
      type: 'date'
    });
  }

  cancel(): void {
    this.showModal = false;
    this.hideModal.emit();
  }

  ngOnChanges(changes: any) {
    if (this.onEditActivity === true) {
      this.showDialog();
    }
  }

  showDialog() {
    if (this.onEditActivity === true) {
      this.activeModal();
    }
  }

}
