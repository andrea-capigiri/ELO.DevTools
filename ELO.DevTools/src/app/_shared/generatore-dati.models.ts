import { CodiceAteco, CodiceSAE, CodiceRAE, FormaGiuridica } from './data/generatore-dati.data';

export type TipoGenerazione = 'persona_fisica' | 'impresa_individuale' | 'impresa';

export interface Indirizzo {
    via: string;
    civico: string;
    cap: string;
    comune: string;
    provincia: string;
}

export interface PersonaFisica {
    nome: string;
    cognome: string;
    sesso: 'M' | 'F';
    dataNascita: Date;
    luogoNascita: string;
    provinciaNascita: string;
    codiceFiscale: string;
    indirizzo: Indirizzo;
}

export interface ImpresaIndividuale extends PersonaFisica {
    partitaIva: string;
    rea: string;
    cciaa: string;
    ateco: CodiceAteco;
    sae: CodiceSAE;
    rae: CodiceRAE;
    formaGiuridica: FormaGiuridica;
    dataIscrizione: Date;
}

export interface Impresa {
    ragioneSociale: string;
    formaGiuridica: FormaGiuridica;
    partitaIva: string;
    codiceFiscale: string;
    rea: string;
    cciaa: string;
    ateco: CodiceAteco;
    sae: CodiceSAE;
    rae: CodiceRAE;
    sedeLegale: Indirizzo;
    dataCostituzione: Date;
    capitalesociale: number;
}
