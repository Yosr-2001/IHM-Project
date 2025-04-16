import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Evenement } from 'src/models/evenement';
import { Inscription } from 'src/models/inscription';
import { EvenementService } from 'src/service/evenement.service';
import { InscriptionService } from 'src/service/inscription.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  @Input() hotelId!: string;
  events: any[] = [];
  loading = true;
  evenement!:Evenement;
  error = ''; 
  currentDate = new Date();
  constructor(private ES:EvenementService,
    private IS: InscriptionService,
        private snackBar: MatSnackBar, 
        private router: Router
    
  ) { }

  ngOnInit(): void { this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.ES.getEvenementsAvecHotels().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  isUpcoming(date: Date): boolean {
    return this.ES.isUpcoming(date);
  }
 
  clientId = '123';
  sinscrire(event: any) {
    const nouvelleInscription: Inscription = {
      id: '12',
      idClient: this.clientId,
      idEvenement: event.id,
      dateInscription: new Date()
    };

    this.IS.ajouterInscription(nouvelleInscription).subscribe({
      next: (res) => {
        console.log('Inscription réussie', res);
        this.snackBar.open('✓ Inscription confirmée', 'Fermer', {
          panelClass: ['snackbar-premium'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        });
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }

   goToMesEvents(): void {
    this.router.navigate(['/mes-inscriptions']);    }
}
