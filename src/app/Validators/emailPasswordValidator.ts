import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthServiceService } from '../Components/Shared/Services/auth-service';

export function emailPasswordValidator(authService: AuthServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.get('Email')?.value;
    const password = control.get('Password')?.value;

    if (!email || !password) {
      console.log("nulll");
      return of(null); 
      
    }
    
    return authService.login(email, password).pipe(
      map(response => {        
        if(response === "email isn't exist") {
          return { invalidEmailLogin: 'Invalid email. Please try again.' };
        } else if(response === "password is wrong") {
          return { invalidPasswordLogin: 'Invalid password. Please try again.' };
        } else {
          try {
            const jsonResponse = JSON.parse(response);
            if (jsonResponse.token) {
              return null;
            } else {
              return { invalidLogin: 'Invalid email or password. Please try again.' };
            }
          } catch (e) {
            return { somethingWrong: 'Invalid response format. Please try again.' };
          }
        }
      }),
      catchError(error => {
        console.log("Error occurred:", error);
        return of({ loginCredentials: 'Unable to validate login credentials' });
      })
    );
    
  };
}
