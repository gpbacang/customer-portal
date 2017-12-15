import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ComponentFactoryResolver, Type, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DialogDirective } from './dialog.directive';
import { DialogService, DialogEvent } from './dialog.service';
import $ from 'jquery';

class DialogItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface Dialog {
    data: any;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(DialogDirective) dialogHost: DialogDirective;
    subscribers: Array<Subscription> = [];
    showDialog: boolean = false;
    dialogWrapperElement: any;
    dialogElement: any;

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        this.keyboardInputHandler(event);
    }

    constructor(
        private dialogService: DialogService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {
        this.dialogWrapperElement = document.getElementById('dialog-wrapper');
        this.dialogElement = document.getElementById('dialog');

        this.subscribers.push(this.dialogService.subscribe((data) => {
            if (!!data && data.operation === DialogEvent.OPEN) {
                    this.open(data);
            } else if (data && ( data.operation === DialogEvent.CLOSE || data.operation === DialogEvent.DESTROY )) {
                this.close();
            }
       }))
    }
    ngAfterViewInit() {
        // this.loadComponent();
        // $('.ui.modal').modal('show');
    }

    ngOnDestroy() {
        if (this.subscribers) {
            this.subscribers.forEach(item => item.unsubscribe());
            this.subscribers = null;
        }
    }

    keyboardInputHandler(event: KeyboardEvent) {
        switch (event.key) {
            case 'Escape': {
                this.close();
                break;
            }
            default:
        }
    }

    private open(data: DialogItem) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.component);

        let viewContainerRef = this.dialogHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<Dialog>componentRef.instance).data = data.data;
        this.showDialog = true;
        
        this.dialogWrapperElement.onclick = () => {
            this.close();
        };
        this.dialogElement.onclick = () => {
            event.stopPropagation();
        };
    }
    private close() {
        this.showDialog = false;
        this.dialogHost.viewContainerRef.detach(0);
    }

    
}