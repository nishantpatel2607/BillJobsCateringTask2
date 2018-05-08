import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IUser } from '../../models/Iuser';

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
  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      displayName:['', Validators.required],
      mealPreference: [''],
      department:[''],
      team:['']
    })
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

  }

  cancelForm(){
    
  }

}
