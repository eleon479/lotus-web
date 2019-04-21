import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private LOTUS_SERVICE_HOST = 'https://lotus-service.herokuapp.com';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const call = `${this.LOTUS_SERVICE_HOST}/api/login/`;
    const loginRequestObject = {
      email,
      password
    };

    this.http
      .post(call, loginRequestObject)
      .subscribe(val => console.log('POST OK: ', val), response => console.log('POST BAD: ', response), () => console.log('DONE'));
  }
}
