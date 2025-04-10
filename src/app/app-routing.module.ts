import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {HomeComponent} from "./home/home.component";
import {RoomTypesComponent} from "./room-types/room-types.component";
import { RoomComponent } from './room/room.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OffreComponent } from './offre/offre.component';
import { EvenementComponent } from './evenement/evenement.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';

const routes: Routes = [
  { path: 'clients', component:ClientsComponent },
  { path: 'roomTypes', component:RoomTypesComponent },
  { path: 'reservations', component:ReservationsComponent },
  { path: 'home', component:HomeComponent },
  { path: 'rooms', component:RoomComponent },
  { path: 'hotels', component:HotelListComponent },
  { path: 'hotel/:id', component: HotelComponent },  
  { path: 'login', component: LoginComponent},
  { path: 'offres', component: OffreComponent},
  { path: 'evenements', component: EvenementComponent},
  
  { path: 'reservation/:id', component: ReservationPageComponent },

  { path: '', component:WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
