export interface Offre {
    id: string;
    nom: string;
    description: string;
    date_debut: string;
    date_fin: string;
    reduction: number; 
    // chambres_incluses?: number;
    hotelId: string;
    prixParNuit: number;
  }
  

export interface Reservation {
  id?: number;
  offreId: string;
  client: {
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
}