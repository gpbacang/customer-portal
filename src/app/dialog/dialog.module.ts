import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDirective } from './dialog.directive';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DialogDirective,
        DialogComponent
    ],
    providers: [DialogService],
    exports: [
        DialogComponent
    ]
})

export class DialogModule {}