
import * as useractions from '../actions/useractions';
import { IUser } from '../models/Iuser';

// Application state interface
export interface State {
    usersList: IUser[];
    requestSuccess: boolean;
    user: IUser;
}

export const INITIAL_STATE: State = { 
    usersList: [],
    requestSuccess: true,
    user: {
        userId:0,
        email: '', 
        firstName: '',
        lastName:'',
        displayName: '',
        mealPreference: '',
        department: '',
        team: ''
    }
  }

//Selector functions - to get only the part of the application state
export const getUsers = (state) => state.usersReducer.usersList;
export const getRequestSuccess = (state) =>  state.usersReducer.requestSuccess;


//Reducer function
export function usersReducer(state = INITIAL_STATE, action): State {
    
    switch (action.type) {
  
        case useractions.RECEIVED_USER_LIST:
        {
             return Object.assign({},state,{
                usersList: action.payload
            });
        }

        case useractions.RECEIVED_USER:
        {
             return Object.assign({},state,{
                user: action.payload
            });
        }

        case useractions.USER_SAVED:
        {
            //console.log (action);
            let res:Response = action.payload;
            if (res.ok){
                return Object.assign({},state,{
                    requestSuccess: true
                });  
            } else {
                return Object.assign({},state,{
                    requestSuccess: false
                });
            }
           
        }
        default:
            return state;
    }
}