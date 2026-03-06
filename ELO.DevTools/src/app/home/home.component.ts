import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../_shared/settings.service';
import { Subscription } from 'rxjs';

interface ToolCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    route: string;
}

const ALL_TOOLS: ToolCard[] = [
    {
        id: 'base64',
        title: 'Base64 Encoder/Decoder',
        description: 'Codifica e decodifica stringhe in Base64',
        icon: 'code',
        route: '/tools/base64'
    },
    {
        id: 'base64-file',
        title: 'Base64 File Encoder/Decoder',
        description: 'Codifica e decodifica file in Base64',
        icon: 'insert_drive_file',
        route: '/tools/base64-file'
    },
    {
        id: 'url',
        title: 'URL Encoder/Decoder',
        description: 'Codifica e decodifica URL parameters',
        icon: 'link',
        route: '/tools/url'
    },
    {
        id: 'guid',
        title: 'UUID Generator',
        description: 'Genera UUID univoci',
        icon: 'fingerprint',
        route: '/tools/guid'
    },
    {
        id: 'hash',
        title: 'Hash Generator',
        description: 'Genera hash MD5, SHA1, SHA256',
        icon: 'security',
        route: '/tools/hash'
    },
    {
        id: 'timestamp',
        title: 'Timestamp Converter',
        description: 'Converte timestamp in date e viceversa',
        icon: 'schedule',
        route: '/tools/timestamp'
    },
    {
        id: 'jwt',
        title: 'JWT Inspector',
        description: 'Visualizza i claim all\'interno di un token JWT',
        icon: 'schedule',
        route: '/tools/jwt'
    },
    {
        id: 'flex-preview',
        title: 'Flex Layout Preview',
        description: 'Anteprima layout Bootstrap Flex con classi pronte',
        icon: 'dashboard',
        route: '/tools/flex-preview'
    },
    {
        id: 'codice-fiscale',
        title: 'Codice Fiscale',
        description: 'Calcola e verifica il codice fiscale italiano',
        icon: 'badge',
        route: '/tools/codice-fiscale'
    },
    {
        id: 'generatore-dati',
        title: 'Generatore Dati',
        description: 'Genera persone fisiche, imprese individuali e società',
        icon: 'group_add',
        route: '/tools/generatore-dati'
    }
];

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        MatIconModule
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
