import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    // requiredTrue especifica que el valor tiene que ser verdadero
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: true,
  };

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  // funcion para mensage de error
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  // funcion para guardar el formulario
  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // si es valido
    console.log(this.myForm.value);
    // quitamos la propiedad de termsAndConditions
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.person);
    this.myForm.reset({
      gender: 'F',
      wantNotifications: true,
    });
  }
}
