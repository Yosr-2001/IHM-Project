// navbar.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
 
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
  isDropdownOpen=false;
  user:any;
  userName: string = "Jean Dupont"; 
  navLinks = [
    { path: '/clients', label: 'Clients', icon: 'people' },
    { path: '/reservations', label: 'Réservations', icon: 'event' },
    { path: '/rooms', label: 'Chambres', icon: 'meeting_room' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('window:resize')
  onResize() { 
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
  
 
ngOnInit(): void {
  this.authService.currentUser$.subscribe(currentUser => {
    this.user = currentUser;
  });
}



logout(): void {

  localStorage.removeItem('currentUser');
 
  this.isDropdownOpen = false;  
  this.authService.logout();  
  this.router.navigate(['/login']);
}


toggleDropdown(): void {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeDropdown(): void {
  this.isDropdownOpen = false;
}


}