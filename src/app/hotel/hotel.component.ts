

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { ComposantHotel, Hotel } from 'src/models/hotel';
import { OffreComponent } from '../offre/offre.component';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotel!: Hotel ;
  composants: any[] = [];
  loading = true;


   constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id');  
 
    if (id) {
      this.loadHotelDetails(id!);
      // this.hotelService.getHotelById(+id).subscribe(data => {
      //   this.hotel = data;
    
      // });
      if (id) {
        this.loadHotelDetails(id);
      }
    }
  }
  
  loadHotelDetails(id: string): void {
    this.hotelService.getHotelById(+id).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.loadComposants(hotel.composantsHotelId);
      },
      error: (err) => {
        console.error('Error loading hotel', err);
        this.loading = false;
      }
    });

  }



  loadComposants(ids: (string | number)[]): void {
    this.hotelService.getComposantsByIds(ids).subscribe({
      next: (composants) => {
        this.composants = composants;
        this.loading = false;
        console.log("Liste des composants:", composants); // Debug propre
      },
      error: (err) => {
        console.error('Error loading components', err);
        this.loading = false;
      }
    });
  }


  getComponentIcon(componentName: string): string {
    const iconMap: {[key: string]: string} = {
      'Spa': 'spa',
      'Salle de sport': 'fitness_center',
      'Piscine': 'pool',
      'Restaurant': 'restaurant',
      'Bar': 'local_bar',
      'WiFi': 'wifi',
      'Parking': 'local_parking',
      'Climatisation': 'ac_unit'
    };
    return iconMap[componentName] || 'miscellaneous_services';
  }
}
