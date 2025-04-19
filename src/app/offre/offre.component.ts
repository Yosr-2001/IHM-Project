import { Component, Input, OnInit } from '@angular/core';
import { Offre } from 'src/models/offre';
import { OffreService } from 'src/service/offre.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
 
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

  constructor(private OS: OffreService,  
    private router: Router,
    private dialog:MatDialog, 
    private http: HttpClient,
    private authService: AuthService
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
    const user = localStorage.getItem("currentUser");
  
    if (user) {
     
      this.router.navigate(['/reservation', offre.id]);
    } else {
     console.log("!!notconnected!!");
      localStorage.setItem('redirectAfterLogin', `/reservation/${offre.id}`);
      this.router.navigate(['/login']);
    }
  }
  
  selectedOffer: string | null = null;

  selectOffer(offerId: string): void {
    this.selectedOffer = offerId;
  }

    contactSupport(): void {
    console.log('Redirection vers le support');
  }
  callSupport(): void {
    window.open('tel:+21612345678');
    this.logHelpRequest('phone');
  }

  openContactForm(): void {
    this.logHelpRequest('email');
  }

  startLiveChat(): void {
    console.log('Démarrage du chat en direct');
    this.logHelpRequest('chat');
  }

  private logHelpRequest(method: string): void {
    console.log(`Demande d'aide via ${method} pour l'hôtel ${this.hotelId}`);
  }
}