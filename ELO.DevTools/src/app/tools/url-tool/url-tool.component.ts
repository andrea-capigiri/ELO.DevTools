import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Textarea } from 'primeng/textarea';
import { UtilityService } from '../../_shared/utility.service';

@Component({
    selector: 'app-url-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        Card,
        ButtonModule, 
        Textarea, 
        RouterModule,
        TranslateModule
    ],
    templateUrl: './url-tool.component.html',
    styleUrls: ['./url-tool.component.scss']
})
export class UrlToolComponent {
    inputText: string = '';
    outputText: string = '';

    constructor(private utilityService: UtilityService) {}

    onEncode(): void {
        if (this.inputText.trim()) {
            this.outputText = this.utilityService.urlEncode(this.inputText);
        }
    }

    onDecode(): void {
        if (this.inputText.trim()) {
            this.outputText = this.utilityService.urlDecode(this.inputText);
        }
    }

    onClear(): void {
        this.inputText = '';
        this.outputText = '';
    }

    onCopy(): void {
        navigator.clipboard.writeText(this.outputText);
    }
}
