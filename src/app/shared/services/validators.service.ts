import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { notEqual } from 'assert';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  // en el caso del campo del nombre y apellido se usa una expresion regular
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  // en el caso del email, la validacion por defecto de Angular solo verifica
  // la existencia de una arroba, para mejorar la validacion se usa una
  // expresion regular y un validador personalizado
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // creamos un validador personalizado
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    // tomamos el valor del campo, le quitamos los espacios delante y detras
    // y lo llevamos a minusculas para poder hacer la comparacion
    const value: string = control.value.trim().toLowerCase();

    // hacemos la comparacion
    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  // funcion de validacion de campos
  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // funcion para comparar dos campos
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // se obtienen los valores de los campos
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // se realiza la comparacion
      if (fieldValue1 !== fieldValue2) {
        // se escoge el campo que va a mostrar el error
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      // si no hay problemas
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
