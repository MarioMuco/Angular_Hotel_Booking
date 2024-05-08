import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../features/auth/store/auth.actions';
import * as AuthSelectors from '../../../features/auth/store/auth.selectors';
import { AppStateInterface } from '../../../core/models/app-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: '',
      errorMessage: '', // Add this line to initialize errorMessage field
    });
  }

  ngOnInit() {
    //After login, if the user is logged in, navigate to the home page
    this.store
      .select(AuthSelectors.loggedInUserSelector)
      .subscribe((loggedInUser) => {
        if (loggedInUser) {
          console.log('Login Successful');
          this.router.navigate(['/']);
        }
      });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    //Check user credentials
    this.store
      .select(AuthSelectors.loggedInUserSelector)
      .subscribe((loggedInUser) => {
        //If the user is not logged in, set the error message
        if (!loggedInUser) {
          this.loginForm
            .get('errorMessage')
            ?.setValue('Invalid Email or Password');
        } else {
          //If the user is logged in, set the error message to an empty string
          this.loginForm.get('errorMessage')?.setValue('');
        }
      });

    //Dispatch login action
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
