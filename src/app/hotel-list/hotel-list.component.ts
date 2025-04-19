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
    prixMax:null,
    prixMin: null,
    etoiles: null,
    piscine: true
  };

  showFilters: boolean = false; 
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
        this.applyFilters();  
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
      const prixOk = 
      (!this.filters.prixMin || hotel.prix_moyen >= this.filters.prixMin) &&
      (!this.filters.prixMax || hotel.prix_moyen <= this.filters.prixMax);
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
      prixMax:null,
      prixMin: null,
      etoiles: null,
      piscine: true
    };
    this.searchTerm = '';
    this.applyFilters();
  }

 
  toggleFilter(): void {
    this.showFilters = !this.showFilters;   
     
    const hotelsGrid = document.querySelector('.hotels-grid') as HTMLElement;
    
    if (this.showFilters) {
      hotelsGrid.style.transform = 'translateX(150px)'; 
    } else {
      hotelsGrid.style.transform = 'translateX(0)';  
    }
  }
}


