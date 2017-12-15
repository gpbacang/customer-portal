import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Host,
  Input, OnChanges, OnInit, Optional, Output,
  SimpleChanges, SkipSelf, ViewContainerRef, AfterViewInit
} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import { DatePickerComponent } from './datepicker.component';
import { DateTime } from './datepicker';

import * as moment from 'moment';

function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  }
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function isNaN(value) {
  if (Number.isNaN) {
    return Number.isNaN(value);
  }
  return value !== value;
};

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector : '[appDatePicker]',
  providers: [DateTime]
})
export class DatePickerDirective implements OnInit, OnChanges, AfterViewInit {
  @Input('date-format')       dateFormat: string;
  @Input('parse-format')      parseFormat: string;
  @Input('date-only')         dateOnly: boolean;
  @Input('time-only')         timeOnly: boolean;
  @Input('month-only')        monthOnly: boolean;
  @Input('close-on-select')   closeOnSelect: boolean = true;
  @Input('default-value')     defaultValue: Date | string;
  @Input('minute-step')       minuteStep: number;
  @Input('min-date')          minDate: Date | string;
  @Input('max-date')          maxDate: Date | string;
  @Input('min-hour')          minHour: Date | number;
  @Input('max-hour')          maxHour: Date | number;
  @Input('disabled-dates')    disabledDates: Date[];
  @Input('show-close-layer')  showCloseLayer: boolean;
  @Input('show-week-numbers') showWeekNumbers: boolean;
  @Input('show-clear-button') showClearButton: boolean = true;
  @Input() formControlName: string;

  @Input('ngModel')        ngModel: any;
  @Output('ngModelChange') ngModelChange = new EventEmitter();
  @Output('valueChanged')  valueChanged$  = new EventEmitter();
  @Output('popupClosed')   popupClosed$   = new EventEmitter();

  private el: HTMLInputElement;                                  /* input element */
  private DateTimePickerEl: HTMLElement;                      /* dropdown element */
  private clearBtnEl: HTMLElement;
  private componentRef: ComponentRef<DatePickerComponent>; /* dropdown component reference */
  private ctrl: AbstractControl;
  private sub: any;
  // private justShown: boolean;

  inputEl: HTMLInputElement;
  clickedDatetimePicker: boolean;

  constructor (
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Host() @SkipSelf() private parent: ControlContainer
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  /**
   * convert defaultValue, minDate, maxDate, minHour, and maxHour to proper types
   */
  normalizeInput() {
    if (this.defaultValue && typeof this.defaultValue === 'string') {
      let d = DateTime.parseDate(<string>this.defaultValue);
      this.defaultValue = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minDate && typeof this.minDate === 'string') {
      let d = DateTime.parseDate(<string>this.minDate);
      this.minDate = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.maxDate && typeof this.maxDate === 'string') {
      let d = DateTime.parseDate(<string>this.maxDate);
      this.maxDate = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minHour) {
      if (this.minHour instanceof Date) {
        this.minHour = (<Date>this.minHour).getHours();
      } else {
        let hour = Number(this.minHour.toString());
        if (!isInteger(hour) || hour > 23 || hour < 0) {
          this.minHour = undefined;
        }
      }
    }

    if (this.maxHour) {
      if (this.maxHour instanceof Date) {
        this.maxHour = (<Date>this.maxHour).getHours();
      } else {
        let hour = Number(this.maxHour.toString());
        if (!isInteger(hour) || hour > 23 || hour < 0) {
          this.maxHour = undefined;
        }
      }
    }
  }

  ngOnInit (): void {
    if (this.parent && this.formControlName) {
      if (this.parent['form']) {
        this.ctrl = (<FormGroup>this.parent['form']).get(this.formControlName);
      } else if (this.parent['name']) {
        let formDir = this.parent.formDirective;
        if (formDir instanceof FormGroupDirective && formDir.form.get(this.parent['name'])) {
          this.ctrl = formDir.form.get(this.parent['name']).get(this.formControlName);
        }
      }
      if (this.ctrl) {
        this.sub = this.ctrl.valueChanges.subscribe((date) => {
          this.setInputElDateValue(date);
          this.updateDatepicker();
        });
      }
    }

    this.normalizeInput();

    this.el.setAttribute('readonly', 'true');

    // wrap this element with a <div> tag, so that we can position dynamic element correctly
    let wrapper = document.createElement('div');
    wrapper.className = 'ng2-datetime-picker-wrapper';
    this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
    wrapper.appendChild(this.el);
    wrapper.style.position = 'relative';

    if (this.showClearButton) {
      let clearBtn = document.createElement('i');
      
      clearBtn.className = 'clear-btn remove icon';
  
      this.el.parentElement.appendChild(clearBtn);
      
      //style clear button
      clearBtn.style.position = 'absolute';
      clearBtn.style.top = '10px';
      clearBtn.style.right = '5px';
      clearBtn.style.display = 'none';
      clearBtn.style.color = 'rgba(0,0,0,0.3)';
  
      this.clearBtnEl = clearBtn;
  
      clearBtn.addEventListener('click', () => {
        this.inputElValueChanged('');
      });
    }

    if (this.ngModel && this.ngModel.getTime) { // if it is a Date object given, set dateValue and toString method
      this.ngModel.toString = () => DateTime.formatDate(this.ngModel, this.dateFormat, this.dateOnly);
    }
    setTimeout( () => { // after [(ngModel)] is applied
      if (this.el.tagName === 'INPUT') {
        this.inputElValueChanged(this.el.value); // set this.el.dateValue and reformat this.el.value
      }
      if (this.ctrl) {
        this.ctrl.markAsPristine();
      }
    });
  }

  ngAfterViewInit() {
    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    this.inputEl = this.el.tagName === 'INPUT' ?
        <HTMLInputElement>this.el : <HTMLInputElement>this.el.querySelector('input');

    if (this.inputEl) {
      this.inputEl.addEventListener('focus', this.showDatetimePicker);
      this.inputEl.addEventListener('blur', this.hideDatetimePicker);
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    let date;
    if (changes && changes['ngModel']) {
      date = changes['ngModel'].currentValue;

      if (date && typeof date !== 'string') {
        date.toString = () => DateTime.formatDate(date, this.dateFormat, this.dateOnly);
        this.setInputElDateValue(date);
        this.updateDatepicker();
      } else if (date && typeof date === 'string') {
        /** if program assigns a string value, then format to date later */
        setTimeout( () => {
          let dt = this.getDate(date);
          dt.toString = () => DateTime.formatDate(dt, this.dateFormat, this.dateOnly);
          this.ngModel = dt;
          this.inputEl.value = '' + dt;
        });
      }
    }
  }

  updateDatepicker() {
    if (this.componentRef) {
      let component = this.componentRef.instance;
      component.defaultValue   = <Date>this.el['dateValue'];
    }
  }

  setInputElDateValue(date) {
    if (typeof date === 'string' && date) {
      this.el['dateValue'] = this.getDate(date);
    } else if (typeof date === 'object') {
      this.el['dateValue'] = date
    } else if (typeof date === 'undefined') {
      this.el['dateValue'] = null;
    }

    if(this.ctrl) {
      this.ctrl.markAsDirty();
    }
  }

  ngOnDestroy ():void {
   if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  /* input element string value is changed */
  inputElValueChanged = (date: string | Date): void => {
    this.setInputElDateValue(date);
    this.el.value = date.toString();
    if(this.ctrl) {
      this.ctrl.patchValue(this.el.value);
    }
    this.ngModel = this.el['dateValue'];
    if (this.ngModel) {
      this.ngModel.toString = () => { return this.el.value; };
      this.ngModelChange.emit(this.ngModel);
    }
  };

  //show datetimePicker element below the current element
  showDatetimePicker = (event?): void =>  {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    // show clear button
    if (this.showClearButton) {
      this.toggleCloseBtn(true);
    }

    let factory = this.resolver.resolveComponentFactory(DatePickerComponent);
    this.componentRef   = this.viewContainerRef.createComponent(factory);
    this.DateTimePickerEl = this.componentRef.location.nativeElement;
    this.DateTimePickerEl.setAttribute('tabindex', '32767');
    this.DateTimePickerEl.addEventListener('mousedown', (event) => {
      this.clickedDatetimePicker = true
    });
    this.DateTimePickerEl.addEventListener('mouseup', (event) => {
      this.clickedDatetimePicker = false;
    });
    this.DateTimePickerEl.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    this.DateTimePickerEl.addEventListener('blur', (event) => {
      this.hideDatetimePicker();
    });

    let component = this.componentRef.instance;
    component.defaultValue   = <Date>this.defaultValue || <Date>this.el['dateValue'];
    component.dateFormat     = this.dateFormat;
    component.dateOnly       = this.dateOnly;
    component.timeOnly       = this.timeOnly;
    component.monthOnly      = this.monthOnly;
    component.minuteStep     = this.minuteStep;
    component.minDate        = <Date>this.minDate;
    component.maxDate        = <Date>this.maxDate;
    component.minHour        = <number>this.minHour;
    component.maxHour        = <number>this.maxHour;
    component.disabledDates  = this.disabledDates;
    component.showCloseButton = this.closeOnSelect === false;
    component.showCloseLayer = this.showCloseLayer;
    component.showWeekNumbers = this.showWeekNumbers;

    this.styleDatetimePicker();
    this.updateDatepicker();
    
    component.selected$.subscribe(this.dateSelected);
    component.closing$.subscribe(() => {
      this.hideDatetimePicker();
    });
  };

  dateSelected = (date) => {
    this.el.tagName === 'INPUT' && this.inputElValueChanged(date);
    this.valueChanged$.emit(date);
    if (this.closeOnSelect !== false) {
      this.hideDatetimePicker();
    } else {
      this.DateTimePickerEl.focus();
    }
  };

  hideDatetimePicker = (event?): any => {
    if (this.clickedDatetimePicker) {
      return false;
    } else {  /* invoked by function call */
      setTimeout(() => { // having exception without setTimeout
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = undefined;
        }
        this.popupClosed$.emit(true);
      });

      // hide clear button
      if (this.showClearButton) {
        setTimeout(() => {
          this.toggleCloseBtn(false);
        }, 100);
      }
    }
    event && event.stopPropagation();
  }

  toggleCloseBtn(show?: boolean) {
    if (show && this.showClearButton) {
      this.clearBtnEl.style.display = 'block';
    } else {
      this.clearBtnEl.style.display = 'none';
    }
  }

  private elementIn (el: Node, containerEl: Node): boolean {
    while (el = el.parentNode) {
      if (el === containerEl) return true;
    }
    return false;
  }

  private styleDatetimePicker () {
    // setting position, width, and height of auto complete dropdown
    let thisElBCR = this.el.getBoundingClientRect();
    // this.DateTimePickerEl.style.minWidth      = thisElBCR.width + 'px';
    this.DateTimePickerEl.style.position = 'absolute';
    this.DateTimePickerEl.style.zIndex = '1000';
    this.DateTimePickerEl.style.left = '0';
    this.DateTimePickerEl.style.transition = 'height 0.3s ease-in';
    this.DateTimePickerEl.style.visibility = 'hidden';

    setTimeout(() => {
      let thisElBcr           = this.el.getBoundingClientRect();
      let DateTimePickerElBcr = this.DateTimePickerEl.getBoundingClientRect();

      if (thisElBcr.bottom + DateTimePickerElBcr.height > window.innerHeight) {
        // this.DateTimePickerEl.style.bottom =
        //   (thisElBcr.bottom - window.innerHeight + 15) + 'px';
        this.DateTimePickerEl.style.bottom = '40px';
        document.getElementById('app-datepicker').classList.add('top');
      }
      else {
        // otherwise, show below
        this.DateTimePickerEl.style.top = thisElBcr.height + 'px';
        document.getElementById('app-datepicker').classList.add('bottom');
      }
      this.DateTimePickerEl.style.visibility = 'visible';
    });
  };

  private getDate = (arg: any): Date  => {
    let date: Date = <Date>arg;
    if (typeof arg === 'string') {
      date =  DateTime.parseDate(arg, this.parseFormat, this.dateFormat);
    }
    return date;
  }
}
