import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../_shared/settings.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface ToolCard {
    id: string;
    titleKey: string;
    descriptionKey: string;
    icon: string;
    route: string;
}

const ALL_TOOLS: ToolCard[] = [
    {
        id: 'base64',
        titleKey: 'tool.base64',
        descriptionKey: 'tool.base64.desc',
        icon: 'code',
        route: '/tools/base64'
    },
    {
        id: 'base64-file',
        titleKey: 'tool.base64-file',
        descriptionKey: 'tool.base64-file.desc',
        icon: 'insert_drive_file',
        route: '/tools/base64-file'
    },
    {
        id: 'url',
        titleKey: 'tool.url',
        descriptionKey: 'tool.url.desc',
        icon: 'link',
        route: '/tools/url'
    },
    {
        id: 'guid',
        titleKey: 'tool.guid',
        descriptionKey: 'tool.guid.desc',
        icon: 'fingerprint',
        route: '/tools/guid'
    },
    {
        id: 'hash',
        titleKey: 'tool.hash',
        descriptionKey: 'tool.hash.desc',
        icon: 'security',
        route: '/tools/hash'
    },
    {
        id: 'timestamp',
        titleKey: 'tool.timestamp',
        descriptionKey: 'tool.timestamp.desc',
        icon: 'schedule',
        route: '/tools/timestamp'
    },
    {
        id: 'jwt',
        titleKey: 'tool.jwt',
        descriptionKey: 'tool.jwt.desc',
        icon: 'schedule',
        route: '/tools/jwt'
    },
    {
        id: 'flex-preview',
        titleKey: 'tool.flex-preview',
        descriptionKey: 'tool.flex-preview.desc',
        icon: 'dashboard',
        route: '/tools/flex-preview'
    },
    {
        id: 'codice-fiscale',
        titleKey: 'tool.codice-fiscale',
        descriptionKey: 'tool.codice-fiscale.desc',
        icon: 'badge',
        route: '/tools/codice-fiscale'
    },
    {
        id: 'generatore-dati',
        titleKey: 'tool.generatore-dati',
        descriptionKey: 'tool.generatore-dati.desc',
        icon: 'group_add',
        route: '/tools/generatore-dati'
    }
];

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    tools: ToolCard[] = [];
    private sub: Subscription;

    constructor(private settingsService: SettingsService) {
        this.sub = this.settingsService.tools$.subscribe(settings => {
            const enabledIds = new Set(settings.filter(s => s.enabled).map(s => s.id));
            this.tools = ALL_TOOLS.filter(t => enabledIds.has(t.id));
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
