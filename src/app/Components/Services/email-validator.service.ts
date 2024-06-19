import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<any[]>(`https://localhost:44374/api/user`).pipe(
      map(users => {
        const isEmailTaken = users.some(user => user.email === control.value);
        return isEmailTaken ? { emailTaken: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}
