import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  invalid: boolean;
  message: string;

  constructor() {}

  ngOnInit() {
    this.invalid = false;
  }

  onSubmit() {
    // add thorough validation later

    if (this.username && this.password) {
      this.invalid = false;
      // let loginObservable = this.userService.login(this.username, this.password);
      // loginObservable.subscribe ...
    } else {
      this.invalid = true;
      this.message = 'Username and password required.';
    }
  }
}
