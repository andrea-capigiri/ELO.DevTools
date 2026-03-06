import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { SettingsService, ToolSetting } from '../_shared/settings.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        RouterModule
    ],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
    tools: ToolSetting[] = [];
    private sub: Subscription;

    constructor(private settingsService: SettingsService) {
        this.sub = this.settingsService.tools$.subscribe(tools => {
            this.tools = tools;
        });
    }

    onToggle(toolId: string, enabled: boolean): void {
        this.settingsService.toggleTool(toolId, enabled);
    }

    onEnableAll(): void {
        this.settingsService.enableAll();
    }

    onDisableAll(): void {
        this.settingsService.disableAll();
    }

    onResetDefaults(): void {
        this.settingsService.resetDefaults();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
