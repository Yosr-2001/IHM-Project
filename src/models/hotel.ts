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
    // offres: {
    //     nom: string;
    //     description: string;
    //     date_debut: string;
    //     date_fin: string;
    //     reduction: number;
    // }[];
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
