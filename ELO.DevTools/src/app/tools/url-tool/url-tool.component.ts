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
    selector: 'app-url-tool',
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
