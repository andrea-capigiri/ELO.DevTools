import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { SettingsService, ToolSetting } from '../_shared/settings.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export type Language = 'en' | 'it';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
        RouterModule,
        TranslateModule
    ],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    currentLanguage: Language = 'en';
    languages: { value: Language; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'it', label: 'Italiano' }
    ];
    private sub: Subscription;

    constructor(
        private settingsService: SettingsService,
        private translate: TranslateService
    ) {
        this.sub = this.settingsService.tools$.subscribe(tools => {
            this.tools = tools;
        });
        this.currentLanguage = this.translate.currentLang as Language || 'en';
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
