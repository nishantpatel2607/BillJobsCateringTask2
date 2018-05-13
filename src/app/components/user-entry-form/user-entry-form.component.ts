import { Component, OnInit, ViewContainerRef, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IUser } from '../../models/Iuser';
import { UserService } from '../../services/users.service';
import { ReadPropExpr } from '@angular/compiler';
import { AppError } from '../../errorhandlers/app-error';
import { NotFoundError } from '../../errorhandlers/not-found-error';
import { BadRequestError } from '../../errorhandlers/bad-request-error';
import { ToastsManager } from 'ng2-toastr';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/usersreducers';
import { CreateUserAction, UpdateUserAction, UserSavedAction } from '../../actions/useractions';
import { Actions } from '@ngrx/effects';
import * as useractions from '../../actions/useractions';

@Component({
  selector: 'userentryform',
  templateUrl: './user-entry-form.component.html',
  styleUrls: ['./user-entry-form.component.css']
})
export class UserEntryFormComponent implements OnInit, OnChanges,OnDestroy {


  //This event will be raised to notify parent component that the record has been saved  
 // @Output('recordSaved') RecordSaved = new EventEmitter();

  @Input('selectedUserId') selectedId: string;

  user: IUser = {
    "userId": 0,
    "firstName": "",
    "lastName": "",
    "displayName": "",
    "email": "",
    "mealPreference": "",
    "department": "",
    "team": ""
  }

  userForm: FormGroup;
  updateSubscription;

  constructor(fb: FormBuilder,
    private userService: UserService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    public store: Store<fromRoot.State>,
  public updates: Actions) {
    this.toastr.setRootViewContainerRef(vcr);
    this.userForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      mealPreference: [''],
      department: [''],
      team: ['']
    });
    
    this.updateSubscription=  updates.ofType(useractions.USER_SAVED)
    .do((data) => {
      let res = <any>data;
      if(res.payload.ok){
        this.toastr.success('User saved successfully.');
        this.resetForm();
      } else {
        this.toastr.error("Error occured while saving.");
      }
      
    })
    .subscribe();
  }



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propertyName in changes){
     
      if (propertyName === "selectedId"){
      let id = changes[propertyName].currentValue;
      if (id !== undefined){
        this.getUser(id);
      }
    }
    
    }
  }

  //getter properties to refer form controls
  get firstName(): AbstractControl {
    return this.userForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get displayName(): AbstractControl {
    return this.userForm.get('displayName');
  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(userData => this.user = userData,
        (error: AppError) => {
          this.handleError(error);
        })
  }

  //form operations 
  saveForm() {
    if (this.user.userId === 0) {
      /* this.userService.createUser(this.user)
        .subscribe((response) => {
          if (response.ok) {
            this.toastr.success('User saved successfully.');
            this.resetForm();

          }
        }, (error: AppError) => {
          this.handleError(error);
        }, () => {
          this.RecordSaved.emit();
        }) */
        this.store.dispatch(new CreateUserAction(this.user));


    } else {
      /* this.userService.updateUser(this.user)
        .subscribe((response) => {
          if (response.ok) {
            this.toastr.success('User updated successfully.');
            this.resetForm();
          }
        }, (error: AppError) => {
          this.handleError(error);
        }, () => {
          this.RecordSaved.emit();
        }) */
        this.store.dispatch(new UpdateUserAction(this.user));
        
    }
  }

  cancelForm() {
    this.resetForm();
  }

  resetForm() {
    this.user = {
      "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "mealPreference": "",
      "department": "",
      "team": ""
    }
    this.userForm.reset();
  }

  ngOnDestroy(){
    this.updateSubscription.unsubscribe();
  }

  handleError(error: AppError) {
    if (error instanceof NotFoundError) {
      this.toastr.error("Requested data not found.");
    }
    else if (error instanceof BadRequestError) {
      this.toastr.error("Unable to process the request.");
    }
    else throw error;
  }

}
