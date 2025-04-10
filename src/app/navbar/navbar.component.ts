// navbar.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('indicator', [
      transition(':enter', [
        style({ width: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ width: '100%' }))
      ]),
      transition(':leave', [
        animate('200ms', style({ width: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent {

  userName: string = "Jean Dupont"; 
  navLinks = [
    { path: '/clients', label: 'Clients', icon: 'people' },
    { path: '/reservations', label: 'Réservations', icon: 'event' },
    { path: '/rooms', label: 'Chambres', icon: 'meeting_room' }
  ];

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    // Gestion responsive manuelle
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
  
logout() {
  //this.authService.logout(); /*****a corriger apres */
  this.router.navigate(['/login']);
}
}