import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userForm!: FormGroup;
  userId!: number;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // Récupérer les données de l'utilisateur depuis localStorage
  //   const userString = localStorage.getItem('currentUser');
  //   if (userString) {
  //     this.currentUser = JSON.parse(userString); // Parser les données JSON
  //   }

  //   // Si tu veux utiliser l'ID de l'URL (dans la route), tu peux le récupérer comme avant
  //   this.userId = +this.route.snapshot.paramMap.get('id')!;

  //   // Initialisation du formulaire
  //   this.userForm = this.fb.group({
  //     nom: [this.currentUser?.nom || '', Validators.required],
  //     prenom: [this.currentUser?.prenom || '', Validators.required],
  //     email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
  //     num_tel: [this.currentUser?.num_tel || '', Validators.required],
  //     date_naissance: [this.currentUser?.date_naissance || '', Validators.required],
  //   });

  //   // Si tu as un autre service pour charger un utilisateur par ID, tu peux garder cette méthode
  //   // this.loadUser(); // Si nécessaire pour charger les infos d'un utilisateur spécifique
  // }

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString);
      this.userId = this.currentUser.id; // Récupérer l'ID depuis l'utilisateur actuel
    } else {
      console.error('Utilisateur non trouvé dans localStorage.');
      alert('Impossible de charger les informations de l\'utilisateur.');
    }
  
    this.userForm = this.fb.group({
      nom: [this.currentUser?.nom || '', Validators.required],
      prenom: [this.currentUser?.prenom || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      num_tel: [this.currentUser?.num_tel || '', Validators.required],
      date_naissance: [this.currentUser?.date_naissance || '', Validators.required],
    });
  }

  // Cette méthode est utilisée pour pré-remplir les informations de l'utilisateur si elles sont disponibles
  loadUser() {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = { id: this.userId, ...this.userForm.value };
      console.log('Données envoyées pour la mise à jour :', updatedUser);
  
      this.userService.modifyUser(updatedUser, updatedUser.id).subscribe(
        () => {
          alert('Utilisateur mis à jour avec succès !');
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          alert('Une erreur est survenue lors de la mise à jour.');
        }
      );
    } else {
      alert('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }
}