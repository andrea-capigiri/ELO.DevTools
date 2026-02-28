export interface Comune {
    nome: string;
    codice: string;
    provincia: string;
}

export type Sesso = 'M' | 'F';

export interface CodiceFiscaleInput {
    cognome: string;
    nome: string;
    dataNascita: Date;
    sesso: Sesso;
    comune: Comune;
}

export interface CodiceFiscaleDettagli {
    cognomeParte: string;
    nomeParte: string;
    annoParte: string;
    meseParte: string;
    giornoParte: string;
    comuneParte: string;
    controlloParte: string;
}

export interface CodiceFiscaleResult {
    codiceFiscale: string;
    dettagli: CodiceFiscaleDettagli;
}

export interface CodiceFiscaleInversoResult {
    valid: boolean;
    checkCharacterValid: boolean;
    cognomeCodice: string;
    nomeCodice: string;
    annoNascita: string;
    meseNascita: number | null;
    giornoNascita: number | null;
    sesso: Sesso | null;
    comune: Comune | null;
    codiceCatastale: string;
    error?: string;
}
