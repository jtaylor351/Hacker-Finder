import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../auth/user.model';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  passwordsMatchValidator(form: FormGroup) {
    const confirmPassword = form.controls.re_password.value;
    const originalPassword = form.controls.password.value;
    if (confirmPassword === originalPassword) {
      return null;
    } else {
      return {
        passMatch: true
      };
    }
  }

  createForm() {
      this.signupForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      university: [null, Validators.compose([])],
      bio: [null, Validators.required],
      picture: [null, Validators.compose([])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: [null, Validators.compose([Validators.required])],
      re_password:  [null, Validators.compose([Validators.required])]
    }, {
      validator: (formGroup: FormGroup) => {
        return this.passwordsMatchValidator(formGroup);
      }
    });
    }

  onSignup() {
    const user = new User(
      this.signupForm.value.firstName,
      this.signupForm.value.lastName,
      this.signupForm.value.password,
      this.signupForm.value.email,
      new Array,
      new Array,
      this.signupForm.value.university,
      this.signupForm.value.picture,
      this.signupForm.value.bio
    );
    this.authService.signup(user)
      .subscribe(
        data => this.router.navigateByUrl('/user/login'),
        error => console.error(error)
      );
  }


  ngOnInit() {
  }

}

