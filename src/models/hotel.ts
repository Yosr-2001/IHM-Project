export interface Hotel {
    id: string;
    nom: string;
    description: string;
    region: string;
    pays: string;
    adresse: string;
    note: number;
    image: string;
    nbre_chambre: number;
    nbre_piscine: number;
    prix_moyen: number;
    composantsHotelId: (number | string)[];
 
    avis: {
        note: number;
        commentaire: string;
    }[];
}


export interface ComposantHotel {
    id: string;
    nom: string;
    image: string;
}
