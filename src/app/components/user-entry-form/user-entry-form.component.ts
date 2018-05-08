import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IUser } from '../../models/Iuser';
import { UserService } from '../../services/users.service';
import { ReadPropExpr } from '@angular/compiler';
import { AppError } from '../../errorhandlers/app-error';
import { NotFoundError } from '../../errorhandlers/not-found-error';
import { BadRequestError } from '../../errorhandlers/bad-request-error';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'userentryform',
  templateUrl: './user-entry-form.component.html',
  styleUrls: ['./user-entry-form.component.css']
})
export class UserEntryFormComponent implements OnInit {

  user: IUser = {
    "userId":0,
    "firstName": "",
    "lastName": "",
    "displayName": "",
    "email": "",
    "mealPreference": "",
    "department": "",
    "team":""
  }

  userForm: FormGroup;
  constructor(fb: FormBuilder,
  private userService: UserService,
  public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.userForm = fb.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      displayName:['', Validators.required],
      mealPreference: [''],
      department:[''],
      team:['']
    });
   }



  ngOnInit() {
  }




  //getter properties to refer form controls
  get firstName(): AbstractControl{
    return this.userForm.get('firstName');
  }

  get lastName(): AbstractControl{
    return this.userForm.get('lastName');
  }

  get email(): AbstractControl{
    return this.userForm.get('email');
  }

  get displayName(): AbstractControl{
    return this.userForm.get('displayName');
  }

  //form operations 
  saveForm(){

    if (this.user.userId === 0){
      this.userService.createUser(this.user)
      .subscribe((response) => {
        if (response.ok){
          this.toastr.success('User saved successfully.');
        }
      },(error: AppError) => {
        this.handleError(error);
      })

    }else {
      this.userService.updateUser(this.user)
      .subscribe((response) => {
        if (response.ok){
          this.toastr.success('User updated successfully.');
        }
      },(error: AppError) => {
        this.handleError(error);
      })

    }

  }

  cancelForm(){
    this.user = {
      "userId":0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "mealPreference": "",
      "department": "",
      "team":""
    }
    this.userForm.reset();
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
