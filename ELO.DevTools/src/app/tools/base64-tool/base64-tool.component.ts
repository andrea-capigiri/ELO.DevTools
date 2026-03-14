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
    selector: 'app-base64-tool',
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
    templateUrl: './base64-tool.component.html',
    styleUrls: ['./base64-tool.component.scss']
})
export class Base64ToolComponent {
    inputText: string = '';
    outputText: string = '';

    constructor(private utilityService: UtilityService) { }

    onEncode(): void {
        if (this.inputText.trim()) {
            this.outputText = this.utilityService.base64Encode(this.inputText);
        }
    }

    onDecode(): void {
        if (this.inputText.trim()) {
            this.outputText = this.utilityService.base64Decode(this.inputText);
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
