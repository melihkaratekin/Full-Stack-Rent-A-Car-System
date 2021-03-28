import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private localStorage:LocalStorageService,
              private toastrService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {

      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(
        response => {
          this.toastrService.success("Login successfully.")
          this.localStorage.set("token", response.data.token)
          this.localStorage.set("email", this.loginForm.get("email")?.value)
          setTimeout(() => { this.router.navigate(['/cars']) }, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error)
        })
      }
  }

}
