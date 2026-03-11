import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Base64ToolComponent } from './tools/base64-tool/base64-tool.component';
import { Base64FileToolComponent } from './tools/base64-file-tool/base64-file-tool.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'settings',
        loadComponent: () => import('./content/content.component').then(m => m.ContentComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./content/settings/settings.component').then(m => m.SettingsComponent)
            }
        ]
    },
    {
        path: 'tools',
        loadComponent: () => import('./content/content.component').then(m => m.ContentComponent),
        children: [
            {
                path: 'base64',
                loadComponent: () => import('./tools/base64-tool/base64-tool.component').then(m => m.Base64ToolComponent),
            },
            {
                path: 'base64-file',
                loadComponent: () => import('./tools/base64-file-tool/base64-file-tool.component').then(m => m.Base64FileToolComponent),
            },
            {
                path: 'url',
                loadComponent: () => import('./tools/url-tool/url-tool.component').then(m => m.UrlToolComponent),
            },
            {
                path: 'guid',
                loadComponent: () => import('./tools/guid-tool/guid-tool.component').then(m => m.GuidToolComponent),
            },
            {
                path: 'jwt',
                loadComponent: () => import('./tools/jwt-tool/jwt-tool.component').then(m => m.JwtToolComponent),
            },
            {
                path: 'hash',
                loadComponent: () => import('./tools/hash-tool/hash-tool.component').then(m => m.HashToolComponent),
            },
            {
                path: 'timestamp',
                loadComponent: () => import('./tools/timestamp-tool/timestamp-tool.component').then(m => m.TimestampToolComponent),
            },
            {
                path: 'codice-fiscale',
                loadComponent: () => import('./tools/codice-fiscale-tool/codice-fiscale-tool.component').then(m => m.CodiceFiscaleToolComponent),
            },
            {
                path: 'generatore-dati',
                loadComponent: () => import('./tools/generatore-dati-tool/generatore-dati-tool.component').then(m => m.GeneratoreDatiToolComponent),
            },
            {
                path: 'flex-preview',
                loadComponent: () => import('./tools/flex-preview-tool/flex-preview-tool.component').then(m => m.FlexPreviewToolComponent),
            },
            {
                path: 'iban',
                loadComponent: () => import('./tools/iban-tool/iban-tool.component').then(m => m.IbanToolComponent),
            },
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
