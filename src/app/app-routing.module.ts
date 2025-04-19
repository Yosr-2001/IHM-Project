import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from "./clients/clients.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import { HomeComponent } from "./home/home.component";
import { RoomTypesComponent } from "./room-types/room-types.component";
import { RoomComponent } from './room/room.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OffreComponent } from './offre/offre.component';
import { EvenementComponent } from './evenement/evenement.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { MesInscriptionsComponent } from './mes-inscriptions/mes-inscriptions.component';
import { ProfilComponent } from './profil/profil.component';
import { SignupComponent } from './signup/signup.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { breadcrumb: 'Accueil' } },

  { path: 'clients', component: ClientsComponent, data: { breadcrumb: 'Clients' } },
  { path: 'roomTypes', component: RoomTypesComponent, data: { breadcrumb: 'Types de Chambre' } },
  { path: 'reservations', component: ReservationsComponent, data: { breadcrumb: 'Réservations' } },
  { path: 'rooms', component: RoomComponent, data: { breadcrumb: 'Chambres' } },
  { path: 'login', component: LoginComponent },
  { path: 'offres', component: OffreComponent, data: { breadcrumb: 'Offres' } },
  { path: 'evenements', component: EvenementComponent, data: { breadcrumb: 'Événements' } },
  { path: 'hotels', component: HotelListComponent, data: { breadcrumb: 'Hôtels' } },
  { path: 'hotel/:id', component: HotelComponent, data: { breadcrumb: 'Détails Hôtel' } },
  { path: 'reservation/:id', component: ReservationPageComponent, data: { breadcrumb: 'Réservation' } },
  { path: 'mes-inscriptions', component: MesInscriptionsComponent, data: { breadcrumb: 'Mes Inscriptions' } },
  { path: 'mes-reservations', component: MesReservationsComponent, data: { breadcrumb: 'Mes Réservations' } },

  { path: 'profil', component: ProfilComponent, data: { breadcrumb: 'Profile' } },
  { path: 'signup', component: SignupComponent },



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
