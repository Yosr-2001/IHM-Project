import {Component, OnInit} from '@angular/core';
import {AngularFireAction} from "@angular/fire/compat/database";
import {CrudService} from '../service/crud.service';
import {collection} from "@angular/fire/firestore";
import {ClientsComponent} from "./clients/clients.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Agence Voyage';
  successMessage: string = "";

  constructor(public crudService: CrudService,public clientsComponent:ClientsComponent,
    private router: Router  
  ) {
  } 
  showHeader: boolean = true;

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          const hideForRoutes = ['/login', '/signup'];
          this.showHeader = !hideForRoutes.includes(event.urlAfterRedirects);
        }
      });
    }
}