import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/service/inscription.service';
import { Inscription } from 'src/models/inscription';
import { EvenementService } from 'src/service/evenement.service';
import { Evenement } from 'src/models/evenement';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mes-inscriptions',
  templateUrl: './mes-inscriptions.component.html',
  styleUrls: ['./mes-inscriptions.component.css']
})
export class MesInscriptionsComponent implements OnInit {
  inscriptions: Inscription[] = [];

  constructor(
    private IS: InscriptionService,   
    private ES: EvenementService ,
  private router:Router ) { }

  ngOnInit(): void {
    this.loadInscriptions();
   
  }

  loadInscriptions(): void {
    this.IS.getInscriptionsParClient('123').subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions.map(inscription => {
          // Conversion de la dateInscription en objet Date
          inscription.dateInscription = new Date(inscription.dateInscription);
          return inscription;
        });
  
        if (this.inscriptions.length > 0) {
          const evenementRequests = this.inscriptions.map((inscription) => {
            return this.ES.getEvenementById(inscription.idEvenement);  // Créer un tableau de requêtes pour les événements
          });
  
          forkJoin(evenementRequests).subscribe({
            next: (evenements: Evenement[]) => {
              this.inscriptions.forEach((inscription, index) => {
                inscription.evenement = evenements[index];  // Associer chaque événement à l'inscription correspondante
              });
              console.log('Inscriptions avec événements:', this.inscriptions);
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des événements:', err);
            }
          });
        } else {
          console.log('Aucune inscription trouvée');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des inscriptions', err);
      }
    });
  }
  
  
  
}

