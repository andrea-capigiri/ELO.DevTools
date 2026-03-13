import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { Toolbar } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { GeneratedIban, IbanService } from '../../_shared/iban.service';
import { HistoryService } from '../../_shared/history.service';

const TOOL_ID = 'iban';

@Component({
    selector: 'app-iban-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        Toolbar,
        Card,
        FloatLabel,
        ButtonModule,
        SelectModule,
        TooltipModule,
        TranslateModule
    ],
    templateUrl: './iban-tool.component.html',
    styleUrls: ['./iban-tool.component.scss']
})
export class IbanToolComponent implements OnInit {
    countries: { label: string; value: string }[] = [];
    selectedCountry: string = 'IT';
    result: GeneratedIban | null = null;
    history: GeneratedIban[] = [];

    constructor(
        private ibanService: IbanService,
        private translate: TranslateService,
        private historyService: HistoryService
    ) {}

    ngOnInit(): void {
        this.history = this.historyService.load<GeneratedIban>(TOOL_ID);
        this.buildCountryOptions();

        if (this.translate.currentLang === 'it') {
            this.selectedCountry = 'IT';
        }

        this.translate.onLangChange.subscribe(() => {
            this.buildCountryOptions();
        });
    }

    private buildCountryOptions(): void {
        const rawCountries = this.ibanService.getCountries();
        this.countries = rawCountries.map(c => ({
            label: `${c.code} - ${this.translate.instant('iban.countries.' + c.code)}`,
            value: c.code
        }));
    }

    onGenerate(): void {
        const generated = this.ibanService.generate(this.selectedCountry);
        if (generated) {
            this.result = generated;
            this.history = this.historyService.push(TOOL_ID, generated);
        }
    }

    onCopy(text: string): void {
        navigator.clipboard.writeText(text);
    }

    onCopyAll(): void {
        if (!this.result) return;
        const lines: string[] = [];
        lines.push(`IBAN: ${this.result.iban}`);
        lines.push(`IBAN (${this.translate.instant('iban.formatted')}): ${this.result.ibanFormatted}`);
        lines.push(`${this.translate.instant('iban.countryLabel')}: ${this.translate.instant('iban.countries.' + this.result.country.code)} (${this.result.country.code})`);
        lines.push('');
        for (const s of this.result.segments) {
            lines.push(`${this.translate.instant('iban.segments.' + s.segment.key)}: ${s.value}`);
        }
        navigator.clipboard.writeText(lines.join('\n'));
    }

    onClear(): void {
        this.result = null;
    }

    onLoadHistory(entry: GeneratedIban): void {
        this.result = entry;
        this.selectedCountry = entry.country.code;
    }
}
