import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  // definimos el formulario
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  // definimos un control para un input independiente dentro del formulario
  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  // inyectamos el servicio FormBuilder
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  // creamos un getter para obtener los juegos favoritos
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // esta funcion sirve para chequear si hay errores en un campo y si ha sido tocado
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  // esta funcion sirve para chequear los errores en los campos dinamicos
  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    // en este caso no se pasa el formulario y el campo sino se pasa el campo
    // que contiene el array y las distintas posiciones que pueda tener
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  // funcion para determinar cuales son los errores y devolverlos mediante
  // texto al html en el caso que los haya
  getFieldError(field: string): string | null {
    // si el formulario no posee el campo
    if (!this.myForm.controls[field]) return '';

    // asignamos el objeto errors a una constante, notese que puede estar
    // vacio, o sea no haber errores
    const errors = this.myForm.controls[field].errors || {};

    // creamos un for para iterar todos los errores del objeto
    for (const key of Object.keys(errors)) {
      switch (key) {
        // hay que tener en cuenta la logica de funcionamiento para
        // determinar que caso se coloca primero
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }

    // para aquellos errores que no nos interesa mostrar se devuelve un
    // string vacío
    return '';
  }

  // metodo para borrar un favorito
  onDeleteFavorite(index: number): void {
    // aprovechamos que existe un getter
    this.favoriteGames.removeAt(index);
  }

  // metodo para agregar un favorito
  onAddToFavorites(): void {
    // chequeamos que la entrada no sea invalida
    if (this.newFavorite.invalid) return;
    // si es valido lo guardamos
    const newGame = this.newFavorite.value;
    // lo adicionamos al array a traves del formulario usando el formbuilder
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    // borramos el valor en el campo
    this.newFavorite.reset();
  }

  // definimos el submit
  onSubmit(): void {
    // si el formulario es invalido
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // si es valido
    console.log(this.myForm.value);
    // se borran los valores originales una vez que se hace el submit
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    // se resetea el formulario
    this.myForm.reset();
  }
}
