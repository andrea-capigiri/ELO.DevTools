import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Subscription } from 'rxjs';
import { SettingsService, ToolSetting } from '../_shared/settings.service';
import manifest from '../../manifest.json';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        ToolbarModule,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    private sub: Subscription;
    public title: string = manifest.name;
    public subtitle: string = manifest.description;

    constructor(private settingsService: SettingsService) {
        this.sub = this.settingsService.tools$.subscribe(settings => {
            this.tools = settings.filter(t => t.enabled).sort((a, b) => a.order - b.order);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
