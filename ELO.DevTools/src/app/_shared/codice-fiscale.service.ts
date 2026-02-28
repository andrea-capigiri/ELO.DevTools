import { Injectable } from '@angular/core';
import { COMUNI } from './data/comuni';
import {
    Comune,
    Sesso,
    CodiceFiscaleInput,
    CodiceFiscaleResult,
    CodiceFiscaleInversoResult
} from './codice-fiscale.models';

@Injectable({ providedIn: 'root' })
export class CodiceFiscaleService {

    private readonly MESE_MAP: Record<number, string> = {
        0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'H',
        6: 'L', 7: 'M', 8: 'P', 9: 'R', 10: 'S', 11: 'T'
    };

    private readonly MESE_REVERSE: Record<string, number> = {
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'H': 5,
        'L': 6, 'M': 7, 'P': 8, 'R': 9, 'S': 10, 'T': 11
    };

    private readonly ODD_MAP: Record<string, number> = {
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    };

    private readonly EVEN_MAP: Record<string, number> = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
        'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };

    private readonly REMAINDER_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // --- Public API ---

    calcola(input: CodiceFiscaleInput): CodiceFiscaleResult {
        const cognomeParte = this.estraiCognome(input.cognome);
        const nomeParte = this.estraiNome(input.nome);
        const annoParte = this.estraiAnno(input.dataNascita);
        const meseParte = this.estraiMese(input.dataNascita);
        const giornoParte = this.estraiGiorno(input.dataNascita, input.sesso);
        const comuneParte = input.comune.codice;

        const primi15 = cognomeParte + nomeParte + annoParte + meseParte + giornoParte + comuneParte;
        const controlloParte = this.calcolaCarattereControllo(primi15);

        return {
            codiceFiscale: primi15 + controlloParte,
            dettagli: {
                cognomeParte,
                nomeParte,
                annoParte,
                meseParte,
                giornoParte,
                comuneParte,
                controlloParte
            }
        };
    }

    inverso(codiceFiscale: string): CodiceFiscaleInversoResult {
        const cf = codiceFiscale.toUpperCase().trim();

        if (cf.length !== 16) {
            return this.inversoError('Il codice fiscale deve essere di 16 caratteri');
        }

        if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cf)) {
            return this.inversoError('Formato non valido');
        }

        const cognomeCodice = cf.substring(0, 3);
        const nomeCodice = cf.substring(3, 6);
        const annoNascita = cf.substring(6, 8);
        const meseChar = cf.charAt(8);
        const giornoRaw = parseInt(cf.substring(9, 11), 10);
        const codiceCatastale = cf.substring(11, 15);
        const checkChar = cf.charAt(15);

        const meseNascita = this.MESE_REVERSE[meseChar] ?? null;

        let sesso: Sesso | null = null;
        let giornoNascita: number | null = null;
        if (giornoRaw > 40) {
            sesso = 'F';
            giornoNascita = giornoRaw - 40;
        } else {
            sesso = 'M';
            giornoNascita = giornoRaw;
        }

        const comune = this.getComuneByCodice(codiceCatastale);

        const primi15 = cf.substring(0, 15);
        const expectedCheck = this.calcolaCarattereControllo(primi15);
        const checkCharacterValid = checkChar === expectedCheck;

        return {
            valid: checkCharacterValid && meseNascita !== null,
            checkCharacterValid,
            cognomeCodice,
            nomeCodice,
            annoNascita,
            meseNascita,
            giornoNascita,
            sesso,
            comune: comune ?? null,
            codiceCatastale
        };
    }

    cercaComune(query: string): Comune[] {
        if (!query || query.length < 2) return [];
        const q = query.toUpperCase().trim();
        return COMUNI
            .filter(c => c.nome.toUpperCase().includes(q))
            .sort((a, b) => {
                const aStarts = a.nome.toUpperCase().startsWith(q) ? 0 : 1;
                const bStarts = b.nome.toUpperCase().startsWith(q) ? 0 : 1;
                return aStarts - bStarts || a.nome.localeCompare(b.nome, 'it');
            })
            .slice(0, 50);
    }

    getComuneByCodice(codice: string): Comune | undefined {
        return COMUNI.find(c => c.codice === codice);
    }

    // --- Private methods ---

    private estraiCognome(cognome: string): string {
        const clean = cognome.toUpperCase().replace(/[^A-Z]/g, '');
        const consonanti = this.getConsonanti(clean);
        const vocali = this.getVocali(clean);
        return (consonanti + vocali + 'XXX').substring(0, 3);
    }

    private estraiNome(nome: string): string {
        const clean = nome.toUpperCase().replace(/[^A-Z]/g, '');
        const consonanti = this.getConsonanti(clean);
        const vocali = this.getVocali(clean);

        if (consonanti.length >= 4) {
            return consonanti[0] + consonanti[2] + consonanti[3];
        }
        return (consonanti + vocali + 'XXX').substring(0, 3);
    }

    private estraiAnno(data: Date): string {
        const anno = data.getFullYear().toString();
        return anno.substring(anno.length - 2);
    }

    private estraiMese(data: Date): string {
        return this.MESE_MAP[data.getMonth()];
    }

    private estraiGiorno(data: Date, sesso: Sesso): string {
        let giorno = data.getDate();
        if (sesso === 'F') {
            giorno += 40;
        }
        return giorno.toString().padStart(2, '0');
    }

    private calcolaCarattereControllo(primi15: string): string {
        let sum = 0;
        for (let i = 0; i < 15; i++) {
            const ch = primi15[i];
            if (i % 2 === 0) {
                sum += this.ODD_MAP[ch] ?? 0;
            } else {
                sum += this.EVEN_MAP[ch] ?? 0;
            }
        }
        return this.REMAINDER_MAP[sum % 26];
    }

    private getConsonanti(str: string): string {
        return str.replace(/[AEIOU]/g, '');
    }

    private getVocali(str: string): string {
        return str.replace(/[^AEIOU]/g, '');
    }

    private inversoError(error: string): CodiceFiscaleInversoResult {
        return {
            valid: false,
            checkCharacterValid: false,
            cognomeCodice: '',
            nomeCodice: '',
            annoNascita: '',
            meseNascita: null,
            giornoNascita: null,
            sesso: null,
            comune: null,
            codiceCatastale: '',
            error
        };
    }
}
