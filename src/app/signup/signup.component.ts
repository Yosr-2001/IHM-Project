import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   

  ngOnInit(): void {
  }
  signupForm: FormGroup;
errorMessage = '';

constructor(private fb: FormBuilder) {
  this.signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

onSubmit() {
  if (this.signupForm.valid) {
    const { name, email, password } = this.signupForm.value;
    
    console.log({ name, email, password });
  } else {
    this.errorMessage = 'Veuillez remplir tous les champs correctement.';
  }
}


}
