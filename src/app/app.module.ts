import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { CrudService } from '../service/crud.service';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientsComponent } from './clients/clients.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from './search/search.component';
import { RoomComponent } from './room/room.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { HotelComponent } from './hotel/hotel.component';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';  // Importation du module des formulaires réactifs

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { OffreComponent } from './offre/offre.component';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { MatRadioModule } from '@angular/material/radio';
import { EvenementComponent } from './evenement/evenement.component';
 


import { MatDialogModule } from '@angular/material/dialog';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
 import { MesInscriptionsComponent } from './mes-inscriptions/mes-inscriptions.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ProfilComponent } from './profil/profil.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';
@NgModule({
  declarations: [
    BreadcrumbComponent,
    AppComponent,
    AboutComponent,
    ContactsComponent,
    ClientsComponent,
    ReservationsComponent,
    RoomTypesComponent,
    HomeComponent,
    NavbarComponent,
    LogoutComponent,
    LoginComponent,
    FooterComponent,
    SearchComponent,
    RoomComponent,
    HotelListComponent,
    HotelComponent,
    WelcomeComponent,
    OffreComponent,
    EvenementComponent,
 
    ReservationPageComponent, 
       MesInscriptionsComponent, ProfilComponent, HotelFilterComponent, 
     

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule, MatDividerModule,
    MatListModule,
    MatCardModule,
    MatInputModule,

    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDialogModule,
     

  ],

  providers: [
    CrudService,
    ClientsComponent,
    RoomTypesComponent, MatDatepickerModule,
    ReservationsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
