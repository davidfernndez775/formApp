import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const callObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {}
    );
    return callObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({ email });
  //   return of({
  //     emailTaken: true,
  //   }).pipe(delay(2000));
  // }

  // CODIGO PARA CHEQUEAR UN CORREO EN EL BACKEND
  // return this.http.get<any[]>(`http://localhost:3000/users?q=${email}`)
  //   .pipe(map(resp => {
  //   return (resp.length === 0)?null:{emailTaken: true}
  // }))
}
