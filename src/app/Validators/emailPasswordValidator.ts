import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthServiceService } from '../Components/Services/auth-service';

export function emailPasswordValidator(authService: AuthServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.get('Email')?.value;
    const password = control.get('Password')?.value;

    if (!email || !password) {
      return of(null); 
    }

    return authService.login(email, password).pipe(
      map(response => {
        if (response.token) {
          return null; 
        } else {
          return { invalidLogin: 'Invalid email or password. Please try again.' };
        }
      }),
      catchError(() => of({ invalidLogin: 'Unable to validate login credentials' }))
    );
  };
}
