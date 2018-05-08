import { Component, ViewChild } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(UsersListComponent)
  public userListComponent: UsersListComponent;

  recordSaved(){
    console.log('Here');
    this.userListComponent.getUsersList();
  }
}
