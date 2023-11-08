import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  isValidField(field: string):boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  getFieldError(field: string):string | null {
   const control = this.myForm.controls[field];
   if (!control) return null;
   const errors = control.errors || {};
   for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
   }
   return null;
  }
  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.getRawValue());
    this.myForm.reset({ name: '', price: 0, inStorage: 0 });
  }
}
