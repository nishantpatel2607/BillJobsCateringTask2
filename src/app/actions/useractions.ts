import { Action } from '@ngrx/store';
import { IUser } from '../models/Iuser';

export const GET_USER_LIST = "GET_USER_LIST";
export const RECEIVED_USER_LIST = "RECEIVED_USER_LIST";
export const TESTACTION = "TEST_ACTION";

export class UserListFetchAction implements Action {
    type = GET_USER_LIST;
}

export class UserListReceivedAction implements Action {
    type = RECEIVED_USER_LIST;
    constructor(public payload: IUser[]) { 
    }
}

export class UserTestAction implements Action {
    type = TESTACTION;
}