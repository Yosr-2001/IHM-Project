import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offre, Reservation } from 'src/models/offre';
import { OffreService } from 'src/service/offre.service';
import { ReservationService } from 'src/service/reservation.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = true;
  error: string | null = null;
     
  offres: { [key: string]: Offre } = {};

  constructor(private reservationService: ReservationService,
    private offreService: OffreService, 
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void 
  {
    const userStr = localStorage.getItem('currentUser');
     
    if (!userStr) {
      this.error = 'Utilisateur non connecté.';
      this.loading = false;
      return;
    } 

    const user = JSON.parse(userStr);
    const userId = user.id; 
    console.log("Utilisateur connecté:", user);  

    this.reservationService.getReservationsCreeesPar(userId).subscribe({
      next: (res) => {
        const reservationsFiltrees = res.filter(r => r.creePar?.id === userId);
        this.reservations = reservationsFiltrees;
  
        this.reservations.forEach(r => {
          this.offreService.getOffreById(r.offreId).subscribe(offre => {
            r.offre = offre;
            if (offre.hotelId) {

              this.offreService.getHotelById(offre.hotelId).subscribe(hotel => {
                r.offre!.hotel = hotel;
              });
              console.log("Hoteeeel",  r.offre!.hotel )
            }
            
            console.log("OFFFRE",  r.offre )
          });
        });
  
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Erreur de chargement des réservations.';
        this.loading = false;
      }
    });

  }
  annulerReservation(reservation: Reservation) {
    if (confirm(`Voulez-vous vraiment annuler la réservation ?`)) {
      this.reservationService.annulerReservation(String(reservation?.id)).subscribe({
        next: () => {
          reservation.statut = 'annulee'; 
          this.cdr.detectChanges();
      
          this.loadReservations();
        },
        error: (err) => {
          console.error(err);
          this.snackbar.open('✗ Erreur lors de l\'annulation', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-premium', 'snackbar-error']
          });
        }
      });
    }
  }
  
  
}
