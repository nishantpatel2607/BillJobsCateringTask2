import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';

import { UserEntryFormComponent } from './components/user-entry-form/user-entry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from './errorhandlers/global-error-handler';
import { UserService } from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    UserEntryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
