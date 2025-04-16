import { Client } from "./client";
import { Evenement } from "./evenement";

export interface Inscription {
    id: string;
    idClient: string;
    idEvenement: string;
    dateInscription: Date;
    client?: Client;
    evenement?: Evenement;
  }
  