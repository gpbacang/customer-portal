import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';

import { ChartsModule } from 'ng2-charts';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActivitiesComponent,
    ActivitiesListComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    L_SEMANTIC_UI_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
