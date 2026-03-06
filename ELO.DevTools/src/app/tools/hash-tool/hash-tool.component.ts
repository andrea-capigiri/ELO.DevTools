import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { UtilityService } from '../../_shared/utility.service';

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';

@Component({
    selector: 'app-hash-tool',
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
        MatButtonToggleModule,
        RouterModule
    ],
    templateUrl: './hash-tool.component.html',
    styleUrls: ['./hash-tool.component.scss']
})
export class HashToolComponent {
    inputText: string = '';
    algorithm: HashAlgorithm = 'sha256';
    results: { algorithm: string; hash: string }[] = [];

    constructor(private utilityService: UtilityService) {}

    async onGenerate(): Promise<void> {
        if (!this.inputText.trim()) return;
        const hash = await this.utilityService.generateHash(this.inputText, this.algorithm);
        this.results = [{ algorithm: this.algorithm.toUpperCase(), hash }];
    }

    async onGenerateAll(): Promise<void> {
        if (!this.inputText.trim()) return;
        const algorithms: HashAlgorithm[] = ['md5', 'sha1', 'sha256', 'sha384', 'sha512'];
        this.results = [];
        for (const algo of algorithms) {
            const hash = await this.utilityService.generateHash(this.inputText, algo);
            this.results.push({ algorithm: algo.toUpperCase(), hash });
        }
    }

    onClear(): void {
        this.inputText = '';
        this.results = [];
    }

    onCopy(hash: string): void {
        navigator.clipboard.writeText(hash);
    }

    onCopyAll(): void {
        const text = this.results.map(r => `${r.algorithm}: ${r.hash}`).join('\n');
        navigator.clipboard.writeText(text);
    }
}
