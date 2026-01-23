import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        HomeComponent,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent { }
