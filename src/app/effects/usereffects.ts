import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as useractions from '../actions/useractions';
import { UserService } from '../services/users.service';
import { UserListReceivedAction } from '../actions/useractions';


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
}