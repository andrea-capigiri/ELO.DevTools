import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        HomeComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent { }
