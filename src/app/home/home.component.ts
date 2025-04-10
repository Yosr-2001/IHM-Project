import { animate, keyframes,query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('pageLoad', [
      transition(':enter', [
        query('.title-container', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger(100, [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('buttonHover', [
      transition('* => hover', [
        animate('300ms ease', 
          style({ transform: 'scale(1.05)', boxShadow: '0 8px 24px rgba(13, 71, 161, 0.2)' }))
      ]),
      transition('hover => *', [
        animate('200ms ease')
      ])
    ])
  ]
})
 
export class HomeComponent implements OnInit {
  /**************** */
  selectedTravelers = '2';
  searchControl = new FormControl('');
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date(Date.now() + 86400000)); // +1 jour
  features = [
    {
      icon: 'fas fa-concierge-bell fa-3x',
      title: 'Gestion des Réservations',
      description: 'Suivi en temps réel des réservations et disponibilités'
    },
    {
      icon: 'fas fa-bed fa-3x',
      title: 'Gestion des Chambres',
      description: 'Contrôle complet de l état des chambres et services'
    },
    {
      icon: 'fas fa-users-cog fa-3x',
      title: 'Service Client',
      description: 'Interface client complète avec historique des séjours'
    }
  ];
/************ */
  stats = [
    { value: 250, label: 'Clients Satisfaits' },
    { value: 120, label: 'Chambres Disponibles' },
    { value: 99, label: 'Taux d\'Occupation' }
  ];

  ngOnInit() {
    this.animateStats();
  }

  animateStats() {
    this.stats.forEach((stat, index) => {
      const target = stat.value;
      stat.value = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          stat.value += Math.ceil(target / 20);
          if (stat.value >= target) {
            stat.value = target;
            clearInterval(interval);
          }
        }, 50);
      }, index * 300);
    });
  }
  buttonState = 'normal';
  
  onButtonHover(hovering: boolean) {
    this.buttonState = hovering ? 'hover' : 'normal';
  }
}