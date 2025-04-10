import { Component, Input, OnInit } from '@angular/core';
import { Offre } from 'src/models/offre';
import { OffreService } from 'src/service/offre.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offres: Offre[] = [];
  loading = true;
  error = '';
  @Input() hotelId!: string;

  constructor(private OS: OffreService,  private router: Router,
    private dialog:MatDialog, private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.OS.getOffresByHotel(this.hotelId).subscribe({
      next: (offres) => {
        this.offres = offres;
        this.loading = false;
        console.log('Offres chargées:', offres);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des offres';
        this.loading = false;
        console.error('Erreur détaillée:', err);
      }
    });
  }
  
  
  reserverOffre(offre: Offre): void {
    this.router.navigate(['/reservation', offre.id]);
    
  }
  selectedOffer: string | null = null;

  selectOffer(offerId: string): void {
    this.selectedOffer = offerId;
  }

    contactSupport(): void {
    console.log('Redirection vers le support');
    // this.router.navigate(['/contact']);
  }
  callSupport(): void {
    window.open('tel:+21612345678');
    this.logHelpRequest('phone');
  }

  openContactForm(): void {
    // this.dialog.open(ContactFormDialog);
    this.logHelpRequest('email');
  }

  startLiveChat(): void {
    // Intégration avec votre solution de chat
    console.log('Démarrage du chat en direct');
    this.logHelpRequest('chat');
  }

  private logHelpRequest(method: string): void {
    // Envoyer ces données à votre système d'analyse
    console.log(`Demande d'aide via ${method} pour l'hôtel ${this.hotelId}`);
  }
}