import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  submit()
  {
    console.log(this.loginForm.errors);
    if(!this.loginForm.valid) return;

    let loginDetails : LoginModel = {} as LoginModel;
    loginDetails.email = this.loginForm.get("email")?.value;
    loginDetails.password = this.loginForm.get("password")?.value;

    this.authService.login(loginDetails);

  }
}
