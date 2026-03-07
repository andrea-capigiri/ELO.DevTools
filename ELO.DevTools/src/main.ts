import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const LANGUAGE_KEY = 'elo-devtools-language';

function getSavedLanguage(): string {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.get(LANGUAGE_KEY, (result) => {
                if (result[LANGUAGE_KEY]) {
                    return result[LANGUAGE_KEY];
                }
            });
        } else {
            const stored = localStorage.getItem(LANGUAGE_KEY);
            if (stored === 'en' || stored === 'it') {
                return stored;
            }
        }
    } catch {
        // Use default
    }
    return 'en';
}

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            },
            ripple: false
        }),
        provideRouter(routes),
        provideHttpClient(),
        provideTranslateService({
            lang: getSavedLanguage(),
            fallbackLang: 'en'
        }),
        provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        })
    ]
})
    .catch((err) => console.error(err));
