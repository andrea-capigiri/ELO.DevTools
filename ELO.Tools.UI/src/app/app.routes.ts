import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Base64ToolComponent } from './tools/base64-tool/base64-tool.component';
import { UrlToolComponent } from './tools/url-tool/url-tool.component';
import { GuidToolComponent } from './tools/guid-tool/guid-tool.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tools/base64', component: Base64ToolComponent },
    { path: 'tools/url', component: UrlToolComponent },
    { path: 'tools/guid', component: GuidToolComponent },
    { path: '**', redirectTo: '/home' }
];
