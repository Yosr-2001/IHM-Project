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
    hotels:  Hotel[] = [];
    filteredHotels: Hotel[] = [];
    searchTerm = '';
    isLoading = true;
    errorMessage: string | null = null;

  constructor(private HS: HotelService, private cdr: ChangeDetectorRef) { 
    // this.filteredHotels = [...this.hotels]; 
  }
  ngOnInit() {
    this.fetchData();
    
    // setTimeout(() => {
    //   this.filteredHotels = [...this.hotels];
    //   this.cdr.detectChanges();
    // }, 0);
  }
  fetchData(): void {
    this.HS.getHotels().subscribe({
      next: (hotels) => {
        this.hotels = hotels;
        this.filteredHotels = [...this.hotels];
        this.isLoading = false;
        console.log(hotels);
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
        this.errorMessage = 'Failed to load hotels. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  filterHotels() {
    if (!this.hotels) return;
    
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      hotel.region.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}