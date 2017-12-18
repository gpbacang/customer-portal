import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';

import { ChartsModule } from 'ng2-charts';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { DatePickerDirective } from './datepicker/datepicker.directive';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    ActivitiesListComponent,
    DialogBoxComponent,
    DatePickerDirective,
    DatePickerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    L_SEMANTIC_UI_MODULE,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    DatePickerDirective,
    DatePickerComponent,
    AuthService,
    AuthGuard
  ],
  entryComponents: [
    DatePickerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
