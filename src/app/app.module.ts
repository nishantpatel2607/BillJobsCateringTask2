import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEntryFormComponent } from './components/user-entry-form/user-entry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from './errorhandlers/global-error-handler';
import { UserService } from './services/users.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UsersListComponent } from './components/users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './reducers/usersreducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/usereffects';

@NgModule({
  declarations: [
    AppComponent,
    UserEntryFormComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot({usersReducer}),
    EffectsModule.forRoot([UserEffects]),
    ToastModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
