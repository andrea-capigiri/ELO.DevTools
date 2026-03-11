import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { Title } from '@angular/platform-browser';
import manifest from '../manifest.json';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        FooterComponent,
        RouterOutlet
    ],
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent {
    constructor(private title: Title) {
        this.title.setTitle(manifest.short_name);
    }
}
