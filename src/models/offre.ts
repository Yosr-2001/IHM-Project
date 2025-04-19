import { Hotel } from "./hotel";

export interface Offre {
    id: string;
    nom: string;
    description: string;
    date_debut: string;
    date_fin: string;
    reduction: number;  
    hotelId: string;
    hotel: Hotel;
    prixParNuit: number;
  }
  

export interface Reservation {
  id?: number;
  offreId: string;
  offre?: Offre; 
  client: {
    id:string,
    nom: string;
    email: string;
    telephone: string;
  };
  details: {
    dateArrivee: string;
    dateDepart: string;
    nombrePersonnes: number;
     
  };
  statut: 'en_attente' | 'confirmee' | 'annulee';  
  dateCreation?: string;  
  creePar?: {
    id: string;
    nom: string;
    email: string;
  };
}