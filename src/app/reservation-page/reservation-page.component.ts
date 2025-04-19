import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre, Reservation } from 'src/models/offre';
import { ReservationService } from 'src/service/reservation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { OffreService } from 'src/service/offre.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  animations: [
    trigger('snackbarAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ReservationPageComponent implements OnInit {
  offre!: Offre;

  reservation: Reservation = {
    offreId: '',
    client: { id: '', nom: '', email: '', telephone: '' },
    details: { dateArrivee: '', dateDepart: '', nombrePersonnes: 1 },
    statut: 'en_attente'
  };

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private offreService: OffreService,
    private router: Router
  ) { }

  ngOnInit() {
    const offreId = this.route.snapshot.paramMap.get('id');
    if (offreId) {
      this.loadOffre(offreId);
    }
  }

  loadOffre(id: string) {
    this.offreService.getOffreById(id).subscribe({
      next: (offre) => {
        this.offre = offre;
        this.reservation.offreId = offre.id;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'offre', err);
      }
    });
  }
  loading = true;
  error: string | null = null;

  submitReservation() {
    const userStr = localStorage.getItem('currentUser');

    if (!userStr) {
      this.snackBar.open('✗ Utilisateur non connecté', 'Fermer', {
        panelClass: ['snackbar-premium', 'snackbar-error'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
      return;
    }

    const user = JSON.parse(userStr);

    this.reservation.creePar = {
      id: user.id,
      nom: user.nom,
      email: user.email
    };

    this.reservation.dateCreation = new Date().toISOString();

    this.reservationService.creerReservation(this.reservation).subscribe(
      (response) => {
        console.log('Réservation effectuée avec succès', response);
        this.snackBar.open('✓ Réservation confirmée', 'Fermer', {
          panelClass: ['snackbar-premium'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        });


        this.router.navigate(['/mes-reservations']);

      },
      (error) => {
        console.error('Erreur lors de la création de la réservation', error);
        this.snackBar.open('✗ Erreur de réservation', 'Fermer', {
          panelClass: ['snackbar-premium', 'snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
      }
    );
  }

  resetForm(form: any) {
    form.resetForm();
  }
}
