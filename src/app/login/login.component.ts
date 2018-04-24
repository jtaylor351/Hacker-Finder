import { AuthService } from './../auth/auth.service';
import { User } from './../auth/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


// finish onLogin

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.createForm();
   }

   createForm() {
      this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
   }

  onLogin() {
      const user = new User(null, null, this.loginForm.value.password, this.loginForm.value.email, null);
      this.authService.signin(user)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('email', data.email);
            this.router.navigateByUrl('/home');
          },
          error => console.error(error)
        );
      this.loginForm.reset();
    }

  ngOnInit() {
  }

}
