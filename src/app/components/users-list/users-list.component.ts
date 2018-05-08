import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/users.service';
import { IUser } from '../../models/Iuser';
import { AppError } from '../../errorhandlers/app-error';
import { NotFoundError } from '../../errorhandlers/not-found-error';
import { BadRequestError } from '../../errorhandlers/bad-request-error';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'userslist',
  templateUrl: './users-list.component.html', 
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[];
  constructor(private userService: UserService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(userList => {
      this.users = userList
    },(error: AppError) => {
      this.handleError(error);
    })
  }

  selectUser(user){
    console.log(user);
  }

  handleError(error: AppError){
    if (error instanceof NotFoundError) {
      this.toastr.error ("Requested data not found.");
    }
    else if (error instanceof BadRequestError) {
      this.toastr.error ("Unable to process the request.");
    }
    else throw error;
  }

}
