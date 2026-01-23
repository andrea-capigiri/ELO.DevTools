import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Base64FileToolComponent } from './tools/base64-file-tool/base64-file-tool.component';
import { Base64ToolComponent } from './tools/base64-tool/base64-tool.component';
import { GuidToolComponent } from './tools/guid-tool/guid-tool.component';
import { JwtToolComponent } from './tools/jwt-tool/jwt-tool.component';
import { UrlToolComponent } from './tools/url-tool/url-tool.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tools/base64', component: Base64ToolComponent },
    { path: 'tools/base64-file', component: Base64FileToolComponent },
    { path: 'tools/url', component: UrlToolComponent },
    { path: 'tools/guid', component: GuidToolComponent },
    { path: 'tools/jwt', component: JwtToolComponent },
    { path: '**', redirectTo: '/home' }
];
