// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
// import { HotelService } from 'src/service/hotel.service';
// import { Hotel } from 'src/models/hotel';

// @Component({
//   selector: 'app-hotel-list',
//   templateUrl: './hotel-list.component.html',
//   styleUrls: ['./hotel-list.component.css'],
//   animations: [
//     trigger('listAnimation', [
//       transition(':enter', [
//         query('.hotel-card', [
//           style({ opacity: 0, transform: 'translateY(20px)' }),
//           stagger(150, [
//             animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//           ])
//         ], { optional: true })
//       ])
//     ])
//   ]
// })
// export class HotelListComponent implements OnInit {
//     hotels:  Hotel[] = [];
//     filteredHotels: Hotel[] = [];
//     searchTerm = '';
//     isLoading = true;
//     errorMessage: string | null = null;

//   constructor(private HS: HotelService, private cdr: ChangeDetectorRef) { 
//     // this.filteredHotels = [...this.hotels]; 
//   }
//   ngOnInit() {
//     this.fetchData();
    
//     // setTimeout(() => {
//     //   this.filteredHotels = [...this.hotels];
//     //   this.cdr.detectChanges();
//     // }, 0);
//   }
//   fetchData(): void {
//     this.HS.getHotels().subscribe({
//       next: (hotels) => {
//         this.hotels = hotels;
//         this.filteredHotels = [...this.hotels];
//         this.isLoading = false;
//         console.log(hotels);
//       },
//       error: (err) => {
//         console.error('Error loading hotels:', err);
//         this.errorMessage = 'Failed to load hotels. Please try again later.';
//         this.isLoading = false;
//       }
//     });
//   }

//   filterHotels() {
//     if (!this.hotels) return;
    
//     this.filteredHotels = this.hotels.filter(hotel =>
//       hotel.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       hotel.region.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       hotel.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { HotelService } from 'src/service/hotel.service';
import { Hotel } from 'src/models/hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('.hotel-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string | null = null;

  filters = {
    prixMin: null,
    etoiles: null,
    piscine: true
  };

  showFilters: boolean = false;  // Contrôle l'affichage des filtres
  constructor(private HS: HotelService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.HS.getHotels().subscribe({
      next: (hotels) => {
        this.hotels = hotels;
        this.filteredHotels = [...this.hotels];
        this.isLoading = false;
        this.applyFilters(); // Appliquer les filtres après chargement
      },
      error: (err) => {
        console.error('Erreur de chargement :', err);
        this.errorMessage = 'Impossible de charger les hôtels. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }

  onFiltersUpdated(filters: any): void {
    this.filters = filters;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredHotels = this.hotels.filter(hotel => {
      const prixOk = !this.filters.prixMin || hotel.prix_moyen >= this.filters.prixMin;
      const etoileOk = !this.filters.etoiles || hotel.note >= this.filters.etoiles;
      const piscineOk = this.filters.piscine;

      const searchOk = !this.searchTerm || (
        hotel.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hotel.region.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      return prixOk && etoileOk && piscineOk && searchOk;
    });
  }

  filterHotels(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = {
      prixMin: null,
      etoiles: null,
      piscine: true
    };
    this.searchTerm = '';
    this.applyFilters();
  }


  // Méthode pour activer/désactiver les filtres
  toggleFilter(): void {
    this.showFilters = !this.showFilters;  // Inverse l'état des filtres
    
    // Récupère l'élément de la grille des hôtels
    const hotelsGrid = document.querySelector('.hotels-grid') as HTMLElement;
    
    if (this.showFilters) {
      hotelsGrid.style.transform = 'translateX(150px)'; // Décale vers la droite
    } else {
      hotelsGrid.style.transform = 'translateX(0)'; // Réinitialise la position
    }
  }
}


