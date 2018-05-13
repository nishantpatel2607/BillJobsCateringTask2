import { Action } from '@ngrx/store';
import { IUser } from '../models/Iuser';

export const GET_USER_LIST = "GET_USER_LIST";
export const RECEIVED_USER_LIST = "RECEIVED_USER_LIST";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const USER_SAVED = "USER_SAVED";

export class UserListFetchAction implements Action {
    type = GET_USER_LIST;
}

export class UserListReceivedAction implements Action {
    type = RECEIVED_USER_LIST;
    constructor(public payload: IUser[]) { 
    }
}

export class CreateUserAction implements Action {
    type = CREATE_USER;
    constructor(public payload: IUser) { 
    }
}

export class UpdateUserAction implements Action {
    type = UPDATE_USER;
    constructor(public payload: IUser) { 
    }
}

export class UserSavedAction implements Action {
    type = USER_SAVED;
    constructor(public payload){      
    }
}

