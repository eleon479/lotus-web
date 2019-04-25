import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  name: string;
  tag: string;
  password: string;
  passwordRepeat: string;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit() {

  }

}
