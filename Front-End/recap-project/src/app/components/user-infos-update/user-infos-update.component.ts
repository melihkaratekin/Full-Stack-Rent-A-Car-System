import { LocalStorageService } from './../../services/local-storage.service';
import { UserInfos } from '../../models/entities/user-infos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-infos-update',
  templateUrl: './user-infos-update.component.html',
  styleUrls: ['./user-infos-update.component.css']
})
export class UserInfosUpdateComponent implements OnInit {

  user:UserInfos;
  userInfosUpdateForm:FormGroup;

  constructor(private userService:UserService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
      let email = this.localStorage.get("email");
      this.getUserByEmail(email == undefined
                          ? email = ""
                          : email.toString());
      this.createUserInfosUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  createUserInfosUpdateForm(){
    this.userInfosUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  updateUserInfos(){
    this.userInfosUpdateForm.patchValue({ id: this.user.id })
    if(this.userInfosUpdateForm.valid){
      let userInfoModel = Object.assign({},this.userInfosUpdateForm.value);
      this.userService.updateUserInfos(userInfoModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        this.localStorage.set("email", this.userInfosUpdateForm.get("email")?.value)
        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

}
