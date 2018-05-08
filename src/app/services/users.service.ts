import { environment } from "../../environments/environment.prod";
import { Http, Response, RequestOptions, RequestMethod, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IUser } from "../models/Iuser";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { NotFoundError } from "../errorhandlers/not-found-error";
import { BadRequestError } from "../errorhandlers/bad-request-error";
import { AppError } from "../errorhandlers/app-error";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{
    private _apiUrl = environment.serverUrl;

    constructor(private _http: Http){}

    //get list of users
    getUsers():Observable<IUser[]>{
        return this._http.get(this._apiUrl + "/profiles")
        .map((response: Response) => <IUser[]>response.json())
        .catch(this.handleError);
    }

    //get selected user
    getUser(userId:string):Observable<IUser>{
        return this._http.get(this._apiUrl + "/profiles/" + userId)
        .map((response: Response) => <IUser>response.json())
        .catch(this.handleError);
    }

    //create new user
    createUser(user: IUser): Observable<Response>{
        const options = this.GetOptions();
        let body = JSON.stringify(user);
        return this._http.post(this._apiUrl + "/profiles",body,options)
        .catch(this.handleError);
    }

     //update existing user
     updateUser(user: IUser) : Observable<Response> {
        const options = this.GetOptions();
        let body = JSON.stringify(user);
        return this._http.put(this._apiUrl + "/profiles/" + user.userId,body,options)
        .catch(this.handleError);
    }

     //delete existing user
     deleteUser(userId:number) : Observable<Response> {
        const options = this.GetOptions();
        return this._http.delete(this._apiUrl + "/profiles/" + userId,options)
        .catch(this.handleError);
    }


    private GetOptions(): RequestOptions {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }

    private handleError(error: Response) {
        if (error.status === 404) {
            return Observable.throw(new NotFoundError());
        }
        if (error.status === 400) {
            return Observable.throw(new BadRequestError(error.json()));
        }
        return Observable.throw(new AppError(error));
    }
}