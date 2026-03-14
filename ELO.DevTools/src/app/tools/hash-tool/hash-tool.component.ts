import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Textarea } from 'primeng/textarea';
import { UtilityService } from '../../_shared/utility.service';

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';

@Component({
    selector: 'app-hash-tool',
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
    templateUrl: './hash-tool.component.html',
    styleUrls: ['./hash-tool.component.scss']
})
export class HashToolComponent {
    inputText: string = '';
    algorithm: HashAlgorithm = 'sha256';
    results: { algorithm: string; hash: string }[] = [];

    algorithmOptions = [
        { label: 'MD5', value: 'md5' },
        { label: 'SHA-1', value: 'sha1' },
        { label: 'SHA-256', value: 'sha256' },
        { label: 'SHA-384', value: 'sha384' },
        { label: 'SHA-512', value: 'sha512' }
    ];

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
