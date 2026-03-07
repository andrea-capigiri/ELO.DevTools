import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { TooltipModule } from 'primeng/tooltip';
import { Divider } from 'primeng/divider';
import { UtilityService } from '../../_shared/utility.service';

interface JwtPayload {
    [key: string]: any;
}

interface DecodedJwt {
    header: JwtPayload;
    payload: JwtPayload;
    signature: string;
    isExpired?: boolean;
    expiresAt?: Date;
    issuedAt?: Date;
}

@Component({
    selector: 'app-jwt-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        Toolbar,
        Card,
        ButtonModule,
        InputText,
        Textarea,
        FloatLabel,
        TooltipModule,
        Divider
    ],
    templateUrl: './jwt-tool.component.html',
    styleUrl: './jwt-tool.component.scss'
})
export class JwtToolComponent {
    inputText: string = '';
    decodedJwt: DecodedJwt | null = null;
    error: string = '';

    constructor(private utilityService: UtilityService) { }

    onDecode(): void {
        this.error = '';
        this.decodedJwt = null;

        if (!this.inputText.trim()) return;

        try {
            const parts = this.inputText.split('.');
            if (parts.length !== 3) throw new Error('JWT invalido: deve contenere 3 parti');

            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

            this.decodedJwt = {
                header,
                payload,
                signature: parts[2]
            };

            // Calcola info temporali
            if (payload.exp) {
                this.decodedJwt.expiresAt = new Date(payload.exp * 1000);
                this.decodedJwt.isExpired = Date.now() > payload.exp * 1000;
            }
            if (payload.iat) {
                this.decodedJwt.issuedAt = new Date(payload.iat * 1000);
            }
        } catch (e: any) {
            this.error = e.message || 'Errore nel parsing del JWT';
        }
    }

    async pasteFromClipboard(): Promise<void> {
        try {
            const text = await navigator.clipboard.readText();
            this.inputText = text.trim();
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    onClear(): void {
        this.inputText = '';
        this.decodedJwt = null;
        this.error = '';
    }

    onCopy(text: string): void {
        navigator.clipboard.writeText(text);
    }

    formatJson(obj: any): string {
        return JSON.stringify(obj, null, 2);
    }
}
