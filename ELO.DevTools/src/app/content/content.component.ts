import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { SettingsService } from '../_shared/settings.service';

@Component({
    selector: 'app-content',
    standalone: true,
    imports: [
        RouterModule,
        Toolbar,
        ButtonModule,
        TranslateModule
    ],
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
    constructor(
        public settingsService: SettingsService) { }
}
