import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toolbar } from 'primeng/toolbar';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { RouterModule } from '@angular/router';
import { UtilityService } from '../../_shared/utility.service';

@Component({
    selector: 'app-url-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        Toolbar,
        Card,
        ButtonModule,
        InputText,
        Textarea,
        FloatLabel,
        RouterModule
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
