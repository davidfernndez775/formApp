import { FormControl, ValidationErrors } from '@angular/forms';

// en el caso del campo del nombre y apellido se usa una expresion regular
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

// en el caso del email, la validacion por defecto de Angular solo verifica
// la existencia de una arroba, para mejorar la validacion se usa una
// expresion regular y un validador personalizado
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

// creamos un validador personalizado
export const cantBeStrider = (
  control: FormControl
): ValidationErrors | null => {
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
