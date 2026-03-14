import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Subscription } from 'rxjs';
import manifest from '../../../manifest.json';
import { HistoryService } from '../../_shared/history.service';
import { SettingsService, ToolSetting } from '../../_shared/settings.service';

export type Language = 'en' | 'it';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        Card,
        ButtonModule,
        ToggleSwitch,
        SelectModule,
        FloatLabel,
        RouterModule,
        TranslateModule
    ],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    currentLanguage: Language = 'en';
    manifest = manifest;
    year = new Date().getFullYear();
    languages: { value: Language; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'it', label: 'Italiano' }
    ];
    private sub: Subscription;

    constructor(
        private settingsService: SettingsService,
        private translate: TranslateService,
        private historyService: HistoryService,
        private messageService: MessageService
    ) {
        this.sub = this.settingsService.tools$.subscribe(tools => {
            this.tools = tools;
        });
        this.currentLanguage = this.translate.getCurrentLang() as Language || 'en';
    }

    onToggle(toolId: string, enabled: boolean): void {
        this.settingsService.toggleTool(toolId, enabled);
    }

    onEnableAll(): void {
        this.settingsService.enableAll();
    }

    onDisableAll(): void {
        this.settingsService.disableAll();
    }

    onResetDefaults(): void {
        this.settingsService.resetDefaults();
    }

    onLanguageChange(lang: Language): void {
        this.translate.use(lang);
        this.currentLanguage = lang;
        this.saveLanguage(lang);
    }

    private saveLanguage(lang: Language): void {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                chrome.storage.local.set({ 'elo-devtools-language': lang });
            } else {
                localStorage.setItem('elo-devtools-language', lang);
            }
        } catch {
            // Silently fail
        }
    }

    openGithub(): void {
        const url = 'https://github.com/andrea-capigiri/ELO.DevTools';
        if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    }

    openDonate(): void {
        const url = 'https://www.buymeacoffee.com/andrea.capigiri';
        if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    }

    clearCache(): void {
        this.historyService.clearAll();
        this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('settings.clearCache'),
            detail: this.translate.instant('settings.clearCacheSuccess'),
            life: 3000
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
