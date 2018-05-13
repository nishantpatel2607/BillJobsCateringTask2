import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as useractions from '../actions/useractions';
import { UserService } from '../services/users.service';
import { UserListReceivedAction, UserSavedAction } from '../actions/useractions';


@Injectable()
export class UserEffects {
    constructor(
        private userService:UserService,
        private actions: Actions
    ){}

    @Effect()
    getuserlist: Observable<Action> = this.actions
    .ofType(useractions.GET_USER_LIST)
    .switchMap(()=>
        this.userService.getUsers()
        .map(data => new UserListReceivedAction(data))
    );

    @Effect()
    createuser: Observable<Action> = this.actions
    .ofType(useractions.CREATE_USER)
    .switchMap((action:useractions.CreateUserAction)=>
        this.userService.createUser(action.payload)
        .map(data => {
            
            return new UserSavedAction(data)})
    );

    @Effect()
    updateuser: Observable<Action> = this.actions
    .ofType(useractions.UPDATE_USER)
    .switchMap((action:useractions.UpdateUserAction)=>
        this.userService.updateUser(action.payload)
        .map(data => { 
            //console.log(data);
            return new UserSavedAction(data)})
    );
}