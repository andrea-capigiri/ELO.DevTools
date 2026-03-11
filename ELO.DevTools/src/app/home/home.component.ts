import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SettingsService, ToolSetting } from '../_shared/settings.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    private sub: Subscription;

    constructor(private settingsService: SettingsService) {
        this.sub = this.settingsService.tools$.subscribe(settings => {
            this.tools = settings.filter(t => t.enabled).sort((a, b) => a.order - b.order);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
