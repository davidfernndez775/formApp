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
      (subscriber) => {
        console.log({ email });
        // chequeamos si el correo existe
        if (email === 'panchovilla@gmail.com') {
          // el suscriber es el equivalente a .subscribe
          // el metodo next emite el siguiente valor
          subscriber.next({ emailTaken: true });
          // el metodo complete cierra el observable, ya no emite mas valores
          // es el equivalente al return
          subscriber.complete();
        }
        // si no existe
        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(delay(3000));
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
