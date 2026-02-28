import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
export class HomeComponent {
    public tools = [
        {
            title: 'Base64 Encoder/Decoder',
            description: 'Codifica e decodifica stringhe in Base64',
            icon: 'code',
            route: '/tools/base64'
        },
        {
            title: 'Base64 File Encoder/Decoder',
            description: 'Codifica e decodifica file in Base64',
            icon: 'insert_drive_file',
            route: '/tools/base64-file'
        },
        {
            title: 'URL Encoder/Decoder',
            description: 'Codifica e decodifica URL parameters',
            icon: 'link',
            route: '/tools/url'
        },
        {
            title: 'GUID Generator',
            description: 'Genera GUID univoci',
            icon: 'fingerprint',
            route: '/tools/guid'
        },
        {
            title: 'JSON Formatter',
            description: 'Formatta e valida JSON',
            icon: 'data_object',
            route: '/tools/json'
        },
        {
            title: 'Hash Generator',
            description: 'Genera hash MD5, SHA1, SHA256',
            icon: 'security',
            route: '/tools/hash'
        },
        {
            title: 'Timestamp Converter',
            description: 'Converte timestamp in date e viceversa',
            icon: 'schedule',
            route: '/tools/timestamp'
        },
        {
            title: 'JWT inspector',
            description: 'Visualizza i claim all\'interno di un token JWT',
            icon: 'schedule',
            route: '/tools/jwt'
        },
        {
            title: 'Codice Fiscale',
            description: 'Calcola e verifica il codice fiscale italiano',
            icon: 'badge',
            route: '/tools/codice-fiscale'
        }
    ];
}