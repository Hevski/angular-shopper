import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css'],
})
export class CreateAccountFormComponent {
  createAccountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
    });
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      console.log(this.createAccountForm.value);
    }
  }
}
