import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent {
  // definimos el formulario usando FormBuilder
  public myForm: FormGroup = this.fb.group({
    // cada propiedad se define con la sintaxis
    // propiedad: ['valor inicial', [validadores síncronos], [validadores asíncronas]]
    name: [''],
    price: [0],
    inStorage: [0],
  });

  // inyectamos el servicio FormBuilder
  constructor(private fb: FormBuilder) {}

  onSave(): void {
    console.log(this.myForm.value);
  }
}
