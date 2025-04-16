export interface Evenement{
    id: string;
    nom: string;
    description: string;
    date: Date;
    heure: string;
    
    prix?: number;
    idHotel: string;
     imageUrl: string;
    hotel?: {
      nom: string;
      ville: string;
    };
    
  }