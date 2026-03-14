import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Subscription } from 'rxjs';
import { SettingsService, ToolSetting } from '../_shared/settings.service';
import manifest from '../../manifest.json';

export interface PromoBanner {
    /** Unique ID — used as localStorage key suffix */
    id: string;
    /** i18n key for the small uppercase label above the title */
    eyebrowKey: string;
    /** i18n key for the main title */
    titleKey: string;
    /** i18n key for the description */
    descriptionKey: string;
    /** Icon filename inside assets/promo/ (e.g. "quink.png") */
    iconFile: string;
    /** Optional URL opened when clicking the card */
    downloadUrl?: string;
}

const BANNER_DISMISSED_PREFIX = 'elo-devtools-banner-dismissed-';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const PROMO_BANNERS: PromoBanner[] = [
    {
        id: 'quink',
        eyebrowKey: 'quinkBanner.eyebrow',
        titleKey: 'quinkBanner.title',
        descriptionKey: 'quinkBanner.description',
        iconFile: 'quink.png',
        downloadUrl: 'https://chromewebstore.google.com/detail/quink-your-quick-bookmark/eadeonflklaooilmjloogphhdidhjhii'
    }
];

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        ToolbarModule,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    activeBanner: PromoBanner | null = null;
    private sub: Subscription;
    public title: string = manifest.short_name;
    public subtitle: string = manifest.description;

    constructor(private settingsService: SettingsService) {
        this.sub = this.settingsService.tools$.subscribe(settings => {
            this.tools = settings.filter(t => t.enabled).sort((a, b) => a.order - b.order);
        });
        this.activeBanner = this.findActiveBanner();
    }

    iconPath(iconFile: string): string {
        return `assets/promo/${iconFile}`;
    }

    openBannerUrl(): void {
        const url = this.activeBanner?.downloadUrl;
        if (!url) return;
        if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    }

    dismissBanner(): void {
        if (!this.activeBanner) return;
        localStorage.setItem(BANNER_DISMISSED_PREFIX + this.activeBanner.id, Date.now().toString());
        this.activeBanner = this.findActiveBanner();
    }

    private findActiveBanner(): PromoBanner | null {
        return PROMO_BANNERS.find(b => {
            const dismissed = localStorage.getItem(BANNER_DISMISSED_PREFIX + b.id);
            if (!dismissed) return true;
            return Date.now() - parseInt(dismissed, 10) > THIRTY_DAYS_MS;
        }) ?? null;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
