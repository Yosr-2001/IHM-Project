
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { InscriptionService } from 'src/service/inscription.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private IS:InscriptionService,
    private snackbar:MatSnackBar, private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Connexion réussie :', response.user);
  
          const redirectUrl = localStorage.getItem('redirectAfterLogin');
          const eventIdToRegister = localStorage.getItem('eventIdToRegister');  
  
          if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin'); 
            this.router.navigateByUrl(redirectUrl); 
          }
  
          if (eventIdToRegister) {
            this.IS.ajouterInscription({
              id: '12',  
              idClient: '123', 
              idEvenement: eventIdToRegister,
              dateInscription: new Date()
            }).subscribe({
              next: () => {
                this.snackbar.open('✓ Inscription confirmée', 'Fermer', {
                  panelClass: ['snackbar-premium'],
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  duration: 3000
                });
                localStorage.removeItem('eventIdToRegister'); 
              },
              error: (err) => {
                console.error('Erreur lors de l’inscription', err);
                alert('Une erreur est survenue. Veuillez réessayer.');
              }
            });
          } else {
            this.router.navigate(['/hotels']);  
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
    }
  }
  
  
}