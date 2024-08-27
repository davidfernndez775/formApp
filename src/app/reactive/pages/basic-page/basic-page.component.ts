import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent {
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

  // funcion que controla el submit del formulario
  onSave(): void {
    // si el formulario no es válido
    if (this.myForm.invalid) return;
    // si el formulario es válido
    console.log(this.myForm.value);
  }
}
