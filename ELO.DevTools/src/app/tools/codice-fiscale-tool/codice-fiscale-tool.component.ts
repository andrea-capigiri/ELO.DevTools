import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CodiceFiscaleService } from '../../_shared/codice-fiscale.service';
import {
    Comune,
    Sesso,
    CodiceFiscaleResult,
    CodiceFiscaleInversoResult
} from '../../_shared/codice-fiscale.models';

@Component({
    selector: 'app-codice-fiscale-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        RouterModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './codice-fiscale-tool.component.html',
    styleUrls: ['./codice-fiscale-tool.component.scss']
})
export class CodiceFiscaleToolComponent {
    mode: 'calcolo' | 'inverso' = 'calcolo';

    // Forward calculation
    cognome = '';
    nome = '';
    dataNascita: Date | null = null;
    sesso: Sesso = 'M';
    comuneControl = new FormControl('');
    selectedComune: Comune | null = null;
    filteredComuni: Comune[] = [];
    result: CodiceFiscaleResult | null = null;
    error = '';

    // Reverse calculation
    codiceFiscaleInput = '';
    inversoResult: CodiceFiscaleInversoResult | null = null;

    private readonly MESI = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    constructor(private cfService: CodiceFiscaleService) {
        this.comuneControl.valueChanges.subscribe(value => {
            if (typeof value === 'string') {
                this.filteredComuni = this.cfService.cercaComune(value);
                this.selectedComune = null;
            }
        });
    }

    displayComune(comune: Comune): string {
        return comune ? `${comune.nome} (${comune.provincia})` : '';
    }

    onComuneSelected(event: { option: { value: Comune } }): void {
        this.selectedComune = event.option.value;
    }

    get isCalcoloValid(): boolean {
        return !!(this.cognome.trim() && this.nome.trim() &&
            this.dataNascita && this.selectedComune);
    }

    onCalcola(): void {
        if (!this.isCalcoloValid || !this.selectedComune || !this.dataNascita) return;
        this.error = '';
        try {
            this.result = this.cfService.calcola({
                cognome: this.cognome,
                nome: this.nome,
                dataNascita: this.dataNascita,
                sesso: this.sesso,
                comune: this.selectedComune
            });
        } catch {
            this.error = 'Errore nel calcolo del codice fiscale';
        }
    }

    onInverso(): void {
        this.inversoResult = null;
        if (!this.codiceFiscaleInput.trim()) return;
        this.inversoResult = this.cfService.inverso(this.codiceFiscaleInput);
    }

    onCopy(text: string): void {
        navigator.clipboard.writeText(text);
    }

    onClearCalcolo(): void {
        this.cognome = '';
        this.nome = '';
        this.dataNascita = null;
        this.sesso = 'M';
        this.comuneControl.setValue('');
        this.selectedComune = null;
        this.result = null;
        this.error = '';
    }

    onClearInverso(): void {
        this.codiceFiscaleInput = '';
        this.inversoResult = null;
    }

    getMeseNome(mese: number | null): string {
        if (mese === null || mese < 0 || mese > 11) return '—';
        return this.MESI[mese];
    }
}
