import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  invalid: boolean;
  incorrect: boolean;
  message: string;

  loading: boolean;
  success: boolean;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.invalid = false;
    this.incorrect = false;
    this.loading = false;
    this.success = false;

    if (this.accountService.isLoggedIn()) {
      console.log('! already logged in - should redirect !');

      // redirect to feed
      this.router.navigate(['/feed']);
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.invalid = true;
      this.message = 'E-mail and password required.';
      return;
    }

    this.invalid = false;
    this.loading = true;

    const authResult = this.accountService.login(this.email, this.password);

    authResult
      .then(result => {

        if (!result) {
          this.message = 'Incorrect email or password.';
          this.success = false;
          this.incorrect = true;
          return;
        }

        this.success = true;
        this.incorrect = false;

        // redirect to feed here...
        console.log('login success - redirecting to feed...');
        this.router.navigate(['/feed']);
      })
      .catch(problem => {
        this.message = 'Problem occurred while logging in.';
        this.success = false;
      })
      .finally(() => {
        this.loading = false;
      });


  }
}
