import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  {
  destination: string = '';
  arrivalDate: Date | null = null;
  departureDate: Date | null = null;
  travelers: number = 1;
  maxPrice: number | null = null;
  category: number | null = null;
  equipments: string[] = [];

  travelerOptions = [
    { value: 1, label: '1 Voyageur' },
    { value: 2, label: '2 Voyageurs' },
    { value: 3, label: '3 Voyageurs' },
    { value: 4, label: '4 Voyageurs' },
    { value: 5, label: '5+ Voyageurs' }
  ];

  equipmentOptions = [
    'Wi-Fi', 'Piscine', 'Parking', 'Petit déjeuner inclus',
    'Salle de sport', 'Climatisation', 'Restaurant sur place'
  ];

  search() {
    console.log("Recherche :", {
      destination: this.destination,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      travelers: this.travelers,
      maxPrice: this.maxPrice,
      category: this.category,
      equipments: this.equipments
    });
  }
}
