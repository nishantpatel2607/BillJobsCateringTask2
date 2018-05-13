import { Component, ViewChild } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedUserId: string;

  @ViewChild(UsersListComponent)
  public userListComponent: UsersListComponent;

  recordSaved(){
    
    //this.userListComponent.getUsersList();
  }

  recordSelected(user){
    this.selectedUserId = user.userId;
  }
}
