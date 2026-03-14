import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AutoComplete } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { CodiceFiscaleInversoResult, CodiceFiscaleResult, Comune, Sesso } from '../../_shared/codice-fiscale.models';
import { CodiceFiscaleService } from '../../_shared/codice-fiscale.service';

@Component({
    selector: 'app-codice-fiscale-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        Card,
        ButtonModule,
        InputText,
        FloatLabel,
        AutoComplete,
        DatePicker,
        SelectModule,
        TooltipModule,
        TranslateModule
    ],
    templateUrl: './codice-fiscale-tool.component.html',
    styleUrls: ['./codice-fiscale-tool.component.scss']
})
export class CodiceFiscaleToolComponent implements OnInit {
    mode: 'calcolo' | 'inverso' = 'calcolo';

    // Forward calculation
    cognome = '';
    nome = '';
    dataNascita: Date | null = null;
    sesso: Sesso = 'M';
    selectedComune: Comune | null = null;
    filteredComuni: Comune[] = [];
    result: CodiceFiscaleResult | null = null;
    error = '';

    // Reverse calculation
    codiceFiscaleInput = '';
    inversoResult: CodiceFiscaleInversoResult | null = null;

    sessoOptions: { label: string; value: string }[] = [];

    constructor(private cfService: CodiceFiscaleService, private translate: TranslateService) { }

    ngOnInit(): void {
        this.sessoOptions = [
            { label: this.translate.instant('cf.male'), value: 'M' },
            { label: this.translate.instant('cf.female'), value: 'F' }
        ];
    }

    searchComune(event: { query: string }): void {
        this.filteredComuni = this.cfService.cercaComune(event.query);
    }

    onComuneSelected(event: any): void {
        this.selectedComune = event.value || event;
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
            this.error = this.translate.instant('cf.cfError');
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
        return this.translate.instant('cf.months.' + mese);
    }
}
