import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/users.service';
import { IUser } from '../../models/Iuser';
import { AppError } from '../../errorhandlers/app-error';
import { NotFoundError } from '../../errorhandlers/not-found-error';
import { BadRequestError } from '../../errorhandlers/bad-request-error';
import { ToastsManager } from 'ng2-toastr';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers/usersreducers';
import { Observable } from 'rxjs/Observable';
import { UserListFetchAction, UserListReceivedAction } from '../../actions/useractions';
import { Actions } from '@ngrx/effects';
import * as useractions from '../../actions/useractions';

@Component({
  selector: 'userslist',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  //users: IUser[];
  public users: Observable<IUser[]>
  @Output('recordSelected') RecordSelected = new EventEmitter();
  updateSubscription;
  constructor(private userService: UserService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    public store: Store<fromRoot.State>,
    public updates: Actions) {
    this.toastr.setRootViewContainerRef(vcr); 
    this.users = store.select(fromRoot.getUsers);

    this.updateSubscription=  updates.ofType(useractions.USER_SAVED)
    .do((data) => {
      let res = <any>data;
      if(res.payload.ok){
        this.store.dispatch(new UserListFetchAction());
      } 
      
    })
    .subscribe();

  }

  ngOnInit() {
    //this.getUsersList();
    this.store.dispatch(new UserListFetchAction());
    this.refreshUsersList();
  }

 
  /* getUsersList(){
    
    this.userService.getUsers()
    .subscribe(userList => {
      this.users = userList
    },(error: AppError) => {
      this.handleError(error);
    })
  } */

  selectUser(user) {
    this.RecordSelected.emit({ "userId": user.userId });
  } 

  refreshUsersList() {
    setInterval(() => {
      this.store.dispatch(new UserListFetchAction());
    }, 30000);
  }

  handleError(error: AppError) {
    if (error instanceof NotFoundError) {
      this.toastr.error("Requested data not found.");
    }
    else if (error instanceof BadRequestError) {
      this.toastr.error("Unable to process the request.");
    }
    else throw error;
  }

}
