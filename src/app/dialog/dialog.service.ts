import { Injectable, EventEmitter } from '@angular/core';

export enum DialogEvent {
  OPEN, DESTROY, CLOSE
}

@Injectable()
export class DialogService {
    private currentPopupView: EventEmitter<any> = new EventEmitter<any>();
    private _isOpened: boolean = false;

    constructor() {}

    isOpened(): boolean {
        return this._isOpened;
    }

    open(component: any, data?: any): void {
        if (this._isOpened) {
            this.destroy();
        }
        this.fireEvent(DialogEvent.OPEN, true, {
            component: component,
            data: data
        });
    }

    destroy() {
        this.fireEvent(DialogEvent.DESTROY, false);
    }

    close(): void {
        this.fireEvent(DialogEvent.CLOSE, false);
    }

    subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
        this.currentPopupView.subscribe(generatorOrNext, error, complete);
    }

    private fireEvent(name: DialogEvent, status: boolean, data?: any) {
        let _current = this._isOpened;
        this._isOpened = status;
        let event = {
            operation: name,
            status: {
                current: this._isOpened,
                old: _current
            },
        };
        if (typeof data === 'object' && data != null) {
            Object.assign(event, data);
        }
        this.currentPopupView.emit(event);
    }

}