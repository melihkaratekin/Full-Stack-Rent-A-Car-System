import { UserInfos } from './../../models/entities/user-infos';
import { UserService } from './../../services/user.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserPasswordChangingModel } from 'src/app/models/entities/user-password-changing';

@Component({
  selector: 'app-user-password-update',
  templateUrl: './user-password-update.component.html',
  styleUrls: ['./user-password-update.component.css']
})
export class UserPasswordUpdateComponent implements OnInit {

  user:UserInfos;
  userPasswordChangingModel:UserPasswordChangingModel;
  userPasswordUpdateForm:FormGroup;

  constructor(private authService:AuthService,
              private userService:UserService,
              private toastrService:ToastrService,
              private localStorage:LocalStorageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUserByEmail(email == undefined
                        ? email = ""
                        : email.toString());
    this.createUserPasswordUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  createUserPasswordUpdateForm(){
    this.userPasswordUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      currentPassword:["",Validators.required],
      newPassword:["",Validators.required],
    })
  }

  updateUserPassword(){
    this.userPasswordUpdateForm.patchValue({ id: this.user.id })
    if(this.userPasswordUpdateForm.valid){
      let userPasswordModel = Object.assign({},this.userPasswordUpdateForm.value);
      this.authService.updateUserPassword(userPasswordModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error.message,"Validation Error")
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

}
