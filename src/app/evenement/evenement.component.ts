import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/models/evenement';
import { EvenementService } from 'src/service/evenement.service';

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
  constructor(private ES:EvenementService) { }

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

  submitEvent() {
    this.ES.creerEvent(this.evenement).subscribe(
      (response) => {
        console.log('event effectuée avec succès', response);
         
        
      },
      (error) => {
        console.error('Erreur lors de la création de l event', error);
        
      }
    );
  }
}
