import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UtilityService } from '../../_shared/utility.service';

@Component({
    selector: 'app-base64-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        RouterModule
    ],
    templateUrl: './base64-tool.component.html',
    styleUrls: ['./base64-tool.component.scss']
})
export class Base64ToolComponent {
    inputText: string = '';
    outputText: string = '';
    mode: 'encode' | 'decode' = 'encode';

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

    onSwap(): void {
        const temp = this.inputText;
        this.inputText = this.outputText;
        this.outputText = temp;
        this.mode = this.mode === 'encode' ? 'decode' : 'encode';
    }

    onClear(): void {
        this.inputText = '';
        this.outputText = '';
    }

    onCopy(): void {
        navigator.clipboard.writeText(this.outputText);
    }
}