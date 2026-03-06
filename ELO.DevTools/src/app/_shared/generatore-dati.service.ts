import { Injectable } from '@angular/core';
import { CodiceFiscaleService } from './codice-fiscale.service';
import { COMUNI } from './data/comuni';
import {
    NOMI_MASCHILI, NOMI_FEMMINILI, COGNOMI,
    VIE_TIPI, VIE_NOMI, PROVINCE, ProvinciaInfo,
    FORME_GIURIDICHE, CODICI_ATECO, CODICI_SAE, CODICI_RAE,
    RAGIONI_SOCIALI_PREFISSI, RAGIONI_SOCIALI_SUFFISSI,
    FormaGiuridica, CodiceAteco, CodiceSAE, CodiceRAE
} from './data/generatore-dati.data';
import { Comune, Sesso } from './codice-fiscale.models';
import { PersonaFisica, ImpresaIndividuale, Impresa, Indirizzo } from './generatore-dati.models';

@Injectable({ providedIn: 'root' })
export class GeneratoreDatiService {

    constructor(private cfService: CodiceFiscaleService) {}

    generaPersonaFisica(): PersonaFisica {
        const sesso: Sesso = this.randomItem(['M', 'F']);
        const nome = sesso === 'M' ? this.randomItem(NOMI_MASCHILI) : this.randomItem(NOMI_FEMMINILI);
        const cognome = this.randomItem(COGNOMI);
        const dataNascita = this.randomDate(new Date(1950, 0, 1), new Date(2005, 11, 31));

        const comuniConProvincia = COMUNI.filter(c => c.provincia && c.provincia.length === 2);
        const comuneNascita = this.randomItem(comuniConProvincia);

        const codiceFiscale = this.cfService.calcola({
            cognome, nome, dataNascita, sesso,
            comune: comuneNascita
        }).codiceFiscale;

        const indirizzo = this.generaIndirizzo();

        return {
            nome, cognome, sesso, dataNascita,
            luogoNascita: comuneNascita.nome,
            provinciaNascita: comuneNascita.provincia,
            codiceFiscale, indirizzo
        };
    }

    generaImpresaIndividuale(): ImpresaIndividuale {
        const persona = this.generaPersonaFisica();
        const provincia = PROVINCE.find(p => p.sigla === persona.indirizzo.provincia) || this.randomItem(PROVINCE);
        const partitaIva = this.generaPartitaIva();
        const rea = this.generaRea();
        const ateco = this.randomItem(CODICI_ATECO);
        const sae = this.randomItem(CODICI_SAE.filter(s => ['612', '613', '614'].includes(s.codice)));
        const rae = this.randomItem(CODICI_RAE);
        const formaGiuridica = FORME_GIURIDICHE.find(f => f.codice === 'DI')!;
        const dataIscrizione = this.randomDate(new Date(2000, 0, 1), new Date(2024, 11, 31));

        return {
            ...persona,
            partitaIva,
            rea,
            cciaa: provincia.sigla,
            ateco, sae, rae,
            formaGiuridica,
            dataIscrizione
        };
    }

    generaImpresa(): Impresa {
        const formaGiuridica = this.randomItem(FORME_GIURIDICHE.filter(f => f.tipo === 'societa'));
        const prefisso = this.randomItem(RAGIONI_SOCIALI_PREFISSI);
        const suffisso = this.randomItem(RAGIONI_SOCIALI_SUFFISSI);
        const ragioneSociale = `${prefisso} ${suffisso} ${formaGiuridica.sigla}`;

        const partitaIva = this.generaPartitaIva();
        const codiceFiscale = partitaIva;
        const sedeLegale = this.generaIndirizzo();
        const provincia = PROVINCE.find(p => p.sigla === sedeLegale.provincia) || this.randomItem(PROVINCE);
        const rea = this.generaRea();
        const ateco = this.randomItem(CODICI_ATECO);
        const sae = this.randomItem(CODICI_SAE.filter(s => !['600', '612', '613', '614'].includes(s.codice)));
        const rae = this.randomItem(CODICI_RAE);
        const dataCostituzione = this.randomDate(new Date(1980, 0, 1), new Date(2024, 11, 31));
        const capitalesociale = this.randomCapitaleSociale(formaGiuridica);

        return {
            ragioneSociale, formaGiuridica, partitaIva, codiceFiscale,
            rea, cciaa: provincia.sigla,
            ateco, sae, rae,
            sedeLegale, dataCostituzione, capitalesociale
        };
    }

    // --- Private helpers ---

    private generaIndirizzo(): Indirizzo {
        const provincia = this.randomItem(PROVINCE);
        const tipo = this.randomItem(VIE_TIPI);
        const nomeVia = this.randomItem(VIE_NOMI);
        const civico = this.randomInt(1, 200).toString();
        const cap = this.generaCap(provincia);
        const comuniProvincia = COMUNI.filter(c => c.provincia === provincia.sigla);
        const comune = comuniProvincia.length > 0 ? this.randomItem(comuniProvincia) : { nome: provincia.nome } as Comune;

        return {
            via: `${tipo} ${nomeVia}`,
            civico,
            cap,
            comune: comune.nome,
            provincia: provincia.sigla
        };
    }

    private generaCap(provincia: ProvinciaInfo): string {
        const cap = this.randomInt(provincia.capRange[0], provincia.capRange[1]);
        return cap.toString().padStart(5, '0');
    }

    private generaPartitaIva(): string {
        const digits: number[] = [];
        for (let i = 0; i < 10; i++) {
            digits.push(this.randomInt(0, 9));
        }

        // Luhn check digit (Italian P.IVA algorithm)
        let sumOdd = 0;
        let sumEven = 0;
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                sumOdd += digits[i];
            } else {
                const doubled = digits[i] * 2;
                sumEven += doubled > 9 ? doubled - 9 : doubled;
            }
        }
        const checkDigit = (10 - ((sumOdd + sumEven) % 10)) % 10;
        digits.push(checkDigit);

        return digits.join('');
    }

    private generaRea(): string {
        return this.randomInt(100000, 999999).toString();
    }

    private randomCapitaleSociale(forma: FormaGiuridica): number {
        switch (forma.codice) {
            case 'SRLS': return 1;
            case 'SRL': return this.randomItem([10000, 20000, 50000, 100000]);
            case 'SPA':
            case 'SAPA': return this.randomItem([50000, 100000, 250000, 500000, 1000000]);
            default: return this.randomItem([10000, 25000, 50000]);
        }
    }

    private randomItem<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private randomDate(start: Date, end: Date): Date {
        const time = start.getTime() + Math.random() * (end.getTime() - start.getTime());
        return new Date(time);
    }
}
