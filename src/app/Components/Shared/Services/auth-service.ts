import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'; // Import jwt_decode correctly

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userData: any = null;

  constructor(private httpClient: HttpClient) { }

  decodeUserData() {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken); // Correct usage
      console.log(decodedToken);
      this.userData = decodedToken;
    }
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post('https://localhost:44374/api/user', userData);
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.get<string>(`https://localhost:44374/api/User/login?email=${email}&password=${password}`, { responseType: 'text' as 'json' });
  }
  getDecodedToken() {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      return jwtDecode(encodedToken); // Correct usage
    }
    return null;
  }
}
