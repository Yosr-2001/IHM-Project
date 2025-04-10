import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;

  constructor(
    // private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]    
    });
  }

  // Getter for easy access to form controls
  get formControls() {
    return this.loginForm.controls;
  }

  // Handle the login process
  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
     
    // this.authService.login(this.email, this.password).subscribe(
    //   (response) => { 
    //     this.router.navigate(['/dashboard']); // Remplacez 'dashboard' par la route cible
    //     this.snackBar.open('Connexion réussie!', 'Fermer', { duration: 3000 });
    //   },
    //   (error) => { 
    //     this.isSubmitting = false;
    //     this.snackBar.open('Identifiants incorrects. Veuillez réessayer.', 'Fermer', { duration: 3000 });
    //   }
    // );
  }
}
