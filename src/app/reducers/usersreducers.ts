
import * as useractions from '../actions/useractions';
import { IUser } from '../models/Iuser';

// Application state interface
export interface State {
    usersList: IUser[];
}

export const INITIAL_STATE: State = { 
    usersList: []
  }

//Selector functions - to get only the part of the application state
export const getUsers = (state) => state.usersReducer.usersList;


//Reducer function
export function usersReducer(state = INITIAL_STATE, action): State {
    //console.log(action.type);
    switch (action.type) {
  
        case useractions.RECEIVED_USER_LIST:
        {
             return Object.assign({},state,{
                usersList: action.payload
            });
        }
        default:
            return state;
    }
}