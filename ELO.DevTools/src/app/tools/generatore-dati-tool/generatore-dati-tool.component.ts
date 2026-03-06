import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { GeneratoreDatiService } from '../../_shared/generatore-dati.service';
import { TipoGenerazione, PersonaFisica, ImpresaIndividuale, Impresa } from '../../_shared/generatore-dati.models';

interface StoricoEntry {
    tipo: TipoGenerazione;
    dato: PersonaFisica | ImpresaIndividuale | Impresa;
    etichetta: string;
    timestamp: Date;
}

@Component({
    selector: 'app-generatore-dati-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        RouterModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatDividerModule
    ],
    templateUrl: './generatore-dati-tool.component.html',
    styleUrls: ['./generatore-dati-tool.component.scss']
})
export class GeneratoreDatiToolComponent {
    tipo: TipoGenerazione = 'persona_fisica';
    risultato: PersonaFisica | ImpresaIndividuale | Impresa | null = null;
    storico: StoricoEntry[] = [];

    constructor(private generatore: GeneratoreDatiService) {}

    onGenera(): void {
        switch (this.tipo) {
            case 'persona_fisica':
                this.risultato = this.generatore.generaPersonaFisica();
                break;
            case 'impresa_individuale':
                this.risultato = this.generatore.generaImpresaIndividuale();
                break;
            case 'impresa':
                this.risultato = this.generatore.generaImpresa();
                break;
        }
        if (this.risultato) {
            this.storico.unshift({
                tipo: this.tipo,
                dato: this.risultato,
                etichetta: this.buildEtichetta(this.tipo, this.risultato),
                timestamp: new Date()
            });
            if (this.storico.length > 5) {
                this.storico = this.storico.slice(0, 5);
            }
        }
    }

    onCaricaStorico(entry: StoricoEntry): void {
        this.tipo = entry.tipo;
        this.risultato = entry.dato;
    }

    onCopy(text: string): void {
        navigator.clipboard.writeText(text);
    }

    onCopyAll(): void {
        if (!this.risultato) return;
        const text = this.buildCopyText();
        navigator.clipboard.writeText(text);
    }

    onClear(): void {
        this.risultato = null;
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
    }

    isPersonaFisica(): boolean {
        return this.tipo === 'persona_fisica';
    }

    isImpresaIndividuale(): boolean {
        return this.tipo === 'impresa_individuale';
    }

    isImpresa(): boolean {
        return this.tipo === 'impresa';
    }

    get persona(): PersonaFisica | null {
        if (this.tipo === 'persona_fisica' || this.tipo === 'impresa_individuale') {
            return this.risultato as PersonaFisica;
        }
        return null;
    }

    get impresaIndividuale(): ImpresaIndividuale | null {
        if (this.tipo === 'impresa_individuale') {
            return this.risultato as ImpresaIndividuale;
        }
        return null;
    }

    get impresa(): Impresa | null {
        if (this.tipo === 'impresa') {
            return this.risultato as Impresa;
        }
        return null;
    }

    tipoLabel(tipo: TipoGenerazione): string {
        switch (tipo) {
            case 'persona_fisica': return 'Persona Fisica';
            case 'impresa_individuale': return 'Impresa Individuale';
            case 'impresa': return 'Impresa';
        }
    }

    private buildEtichetta(tipo: TipoGenerazione, dato: PersonaFisica | ImpresaIndividuale | Impresa): string {
        if (tipo === 'impresa') {
            return (dato as Impresa).ragioneSociale;
        }
        const p = dato as PersonaFisica;
        return `${p.nome} ${p.cognome}`;
    }

    private buildCopyText(): string {
        const lines: string[] = [];

        if (this.persona) {
            const p = this.persona;
            lines.push(`Nome: ${p.nome}`);
            lines.push(`Cognome: ${p.cognome}`);
            lines.push(`Sesso: ${p.sesso === 'M' ? 'Maschio' : 'Femmina'}`);
            lines.push(`Data di Nascita: ${this.formatDate(p.dataNascita)}`);
            lines.push(`Luogo di Nascita: ${p.luogoNascita} (${p.provinciaNascita})`);
            lines.push(`Codice Fiscale: ${p.codiceFiscale}`);
            lines.push(`Indirizzo: ${p.indirizzo.via}, ${p.indirizzo.civico}`);
            lines.push(`CAP: ${p.indirizzo.cap}`);
            lines.push(`Comune: ${p.indirizzo.comune} (${p.indirizzo.provincia})`);
        }

        if (this.impresaIndividuale) {
            const ii = this.impresaIndividuale;
            lines.push(`Partita IVA: ${ii.partitaIva}`);
            lines.push(`REA: ${ii.cciaa}-${ii.rea}`);
            lines.push(`Forma Giuridica: ${ii.formaGiuridica.descrizione}`);
            lines.push(`ATECO: ${ii.ateco.codice} - ${ii.ateco.descrizione}`);
            lines.push(`NACE: ${ii.ateco.nace}`);
            lines.push(`SAE: ${ii.sae.codice} - ${ii.sae.descrizione}`);
            lines.push(`RAE: ${ii.rae.codice} - ${ii.rae.descrizione}`);
            lines.push(`Data Iscrizione: ${this.formatDate(ii.dataIscrizione)}`);
        }

        if (this.impresa) {
            const i = this.impresa;
            lines.push(`Ragione Sociale: ${i.ragioneSociale}`);
            lines.push(`Forma Giuridica: ${i.formaGiuridica.descrizione}`);
            lines.push(`Partita IVA: ${i.partitaIva}`);
            lines.push(`Codice Fiscale: ${i.codiceFiscale}`);
            lines.push(`REA: ${i.cciaa}-${i.rea}`);
            lines.push(`ATECO: ${i.ateco.codice} - ${i.ateco.descrizione}`);
            lines.push(`NACE: ${i.ateco.nace}`);
            lines.push(`SAE: ${i.sae.codice} - ${i.sae.descrizione}`);
            lines.push(`RAE: ${i.rae.codice} - ${i.rae.descrizione}`);
            lines.push(`Sede Legale: ${i.sedeLegale.via}, ${i.sedeLegale.civico}`);
            lines.push(`CAP: ${i.sedeLegale.cap}`);
            lines.push(`Comune: ${i.sedeLegale.comune} (${i.sedeLegale.provincia})`);
            lines.push(`Data Costituzione: ${this.formatDate(i.dataCostituzione)}`);
            lines.push(`Capitale Sociale: ${this.formatCurrency(i.capitalesociale)}`);
        }

        return lines.join('\n');
    }
}
