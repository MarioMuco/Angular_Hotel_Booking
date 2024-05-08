import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../../features/auth/store/auth.actions';
import * as AuthSelectors from '../../../features/auth/store/auth.selectors';
import { AppStateInterface } from '../../../core/models/app-state.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern('^[a-zA-Z]*$'),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern('^[a-zA-ZığüşöçİĞÜŞÖÇ]*$'),
          ],
        ],

        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^\\d{11}$'),
            Validators.minLength(11),
            Validators.maxLength(11),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],

        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.store
      .select(AuthSelectors.signUpUserSelector)
      .subscribe((signUpUser) => {
        if (signUpUser) {
          console.log('Sign up successful');
          this.router.navigate(['/login']);
        }
      });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatchedPasswords: true };
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    const firstName = this.signUpForm.get('firstName')?.value;
    const lastName = this.signUpForm.get('lastName')?.value;
    const phoneNumber = this.signUpForm.get('phoneNumber')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.store.dispatch(
      AuthActions.signUp({ firstName, lastName, email, phoneNumber, password })
    );
  }
  formatPhoneNumber() {
    let phoneNumber = this.signUpForm.get('phoneNumber')?.value;
    phoneNumber = String(phoneNumber);
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (phoneNumber.length > 0 && phoneNumber[0] !== '0') {
      phoneNumber = '0' + phoneNumber;
    }
    this.signUpForm.get('phoneNumber')?.setValue(phoneNumber);
  }
  backToHome() {
    this.router.navigate(['/']);
  }
}
