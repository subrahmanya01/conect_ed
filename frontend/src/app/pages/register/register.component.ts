import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { RegisterModel } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms'; // Import necessary types
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isEmailinValid: boolean = false;

  @ViewChild('appTags') tags: any;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // --- Component Lifecycle & Core Logic (Kept as is) ---
  ngOnInit(): void {
    // throw new Error('Method not implemented.'); // Remove or implement actual OnInit logic
  }
  
  submit() {
    if (!this.registerForm.valid) return;
    this.registerUser();
  }

  registerUser() {
    let newRegistration: RegisterModel = {} as RegisterModel;
    newRegistration.firstName = this.registerForm.get("firstName")?.value;
    newRegistration.lastName = this.registerForm.get("lastName")?.value;
    newRegistration.email = this.registerForm.get("email")?.value;
    newRegistration.password = this.registerForm.get("password")?.value;
    newRegistration.tags = this.tags ? this.tags.tagList : []; // Handle case if tags component isn't available

    this.userService.register(newRegistration).subscribe({
      next: (data) => {
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  validateEmail(data: string) {
    // Only validate if email is not empty and passes basic client-side validation
    if (!this.registerForm.get('email')?.valid) return;

    this.userService.isEmailRegistered(data).subscribe({
      next: (data: ApiResponseModel) => {
        this.isEmailinValid = data["isEmailAlreadyRegistered"];
        if (this.isEmailinValid) {
          // Set a custom error on the email control if the email is invalid
          this.registerForm.get('email')?.setErrors({ emailTaken: true });
        } else if (this.registerForm.get('email')?.hasError('emailTaken')) {
          // Clear custom error if validation passes later
          this.registerForm.get('email')?.setErrors(null);
        }
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  // --- Custom Validator Function ---
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      // return if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}