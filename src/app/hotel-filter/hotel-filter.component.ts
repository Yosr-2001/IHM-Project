

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.css']
})
export class HotelFilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  filters = {
    prixMin: null,
    etoiles: null,
    piscine: true
  };

  ngOnInit(): void {
    const storedFilters = localStorage.getItem('hotelFilters');
    if (storedFilters) {
      this.filters = JSON.parse(storedFilters);
      this.filtersChanged.emit(this.filters);
    }
  }

  applyFilters(): void {
    localStorage.setItem('hotelFilters', JSON.stringify(this.filters));
    this.filtersChanged.emit(this.filters);
  }

  resetFilters(): void {
    this.filters = { prixMin: null, etoiles: null, piscine: true };
    localStorage.removeItem('hotelFilters');
    this.filtersChanged.emit(this.filters);
  }
}



