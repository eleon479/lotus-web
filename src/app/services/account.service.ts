import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private LOTUS_SERVICE_HOST = environment.production ? 'https://lotus-service.herokuapp.com' : 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {

    const call = `${this.LOTUS_SERVICE_HOST}/api/login/`;
    const loginRequestPayload = {
      email,
      password
    };

    interface TokenLoginResponse {
      lotusAccountToken: string;
    }

    const loginAttemptResponse = this.http.post<TokenLoginResponse>(call, loginRequestPayload).toPromise();

    return loginAttemptResponse
      .then(accountToken => {
        this.setToken(accountToken.lotusAccountToken);
        return true;
      })
      .catch(err => {
        return false;
      });
  }

  private setToken(token: string) {
    localStorage.setItem('acc_token', token);
  }

  logout() {
    localStorage.removeItem('acc_token');
  }

  isLoggedIn() {

    // 1) check that token is set
    const storedToken = localStorage.getItem('acc_token');

    if (!storedToken) {
      return false;
    }

    // 2) check token against auth server
    const authCall = `${this.LOTUS_SERVICE_HOST}/api/login/check`;
    const authHeaders = {
      headers: {
        'x-auth-token': storedToken
      }
    };

    const checkTokenResponse = this.http.get<{validToken: boolean, reason: string}>(authCall, authHeaders).toPromise();

    return checkTokenResponse
      .then(checkResponse => {
        if (!checkResponse) {
          return false;
        }

        return checkResponse.validToken;
      })
      .catch(err => {
        return false;
      });

  }

}
