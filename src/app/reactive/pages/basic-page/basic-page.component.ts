import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  // definimos el formulario usando FormBuilder
  public myForm: FormGroup = this.fb.group({
    // cada propiedad se define con la sintaxis
    // propiedad: ['valor inicial', [validadores síncronos], [validadores asíncronas]]
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // inyectamos el servicio FormBuilder
  constructor(private fb: FormBuilder) {}

  // supongamos que tenemos un backend que nos manda una info
  // para mostrarla en el formulario cuando se cargue la pagina
  ngOnInit(): void {
    // this.myForm.reset({ name: 'Lavamanos', price: 50, inStorage: 2000 });
  }

  // esta funcion sirve para chequear si hay errores en un campo y si ha sido tocado
  isValidField(field: string): boolean | null {
    // devuelve una expresión para ser usada en un *ngIf
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
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

  // funcion que controla el submit del formulario
  onSave(): void {
    // si el formulario no es válido
    if (this.myForm.invalid) {
      // marcamos todos los campos como que han sido tocados
      this.myForm.markAllAsTouched();
      return;
    }
    // si el formulario es válido
    console.log(this.myForm.value);
    // restablecemos los valores originales del formulario,
    // si le pasamos un argumento, entonces asume esos nuevos
    // valores por defecto
    // ambos casos colocan las propiedades touched y pristine
    // en sus valores por defecto
    this.myForm.reset({ price: 10, inStorage: 0 });
  }
}
