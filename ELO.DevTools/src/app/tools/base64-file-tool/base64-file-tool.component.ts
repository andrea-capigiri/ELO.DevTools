import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toolbar } from 'primeng/toolbar';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectButton } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { RouterModule } from '@angular/router';

const MIME_EXTENSIONS: Record<string, string[]> = {
    'image/png': ['png'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/gif': ['gif'],
    'image/svg+xml': ['svg'],
    'image/webp': ['webp'],
    'image/bmp': ['bmp'],
    'image/x-icon': ['ico'],
    'application/pdf': ['pdf'],
    'application/json': ['json', 'txt'],
    'application/xml': ['xml', 'txt'],
    'text/plain': ['txt', 'csv', 'log'],
    'text/html': ['html', 'txt'],
    'text/css': ['css', 'txt'],
    'text/javascript': ['js', 'txt'],
    'application/zip': ['zip'],
    'application/gzip': ['gz'],
    'application/octet-stream': ['bin', 'dat', 'txt'],
};

@Component({
    selector: 'app-base64-file-tool',
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
        SelectButton,
        SelectModule,
        RouterModule
    ],
    templateUrl: './base64-file-tool.component.html',
    styleUrls: ['./base64-file-tool.component.scss']
})
export class Base64FileToolComponent {
    mode: 'encode' | 'decode' = 'encode';
    isProcessing = false;
    dragOver = false;

    modeOptions = [
        { label: 'Encode', value: 'encode' },
        { label: 'Decode', value: 'decode' }
    ];

    constructor(private cdr: ChangeDetectorRef) {}

    // Encode
    selectedFile: File | null = null;
    base64Output = '';

    // Decode
    base64Input = '';
    decodedContent = '';
    decodedDataUrl = '';
    decodedFileType = '';
    decodedSize = 0;
    downloadFilename = 'decoded-file';
    downloadExtension = 'bin';
    availableExtensions: string[] = ['bin', 'txt'];

    get isImage(): boolean {
        return this.decodedFileType.startsWith('image/');
    }

    get isText(): boolean {
        return this.decodedFileType.startsWith('text/') ||
            this.decodedFileType === 'application/json' ||
            this.decodedFileType === 'application/xml';
    }

    get isCustomExtension(): boolean {
        return this.decodedFileType === 'application/octet-stream';
    }

    // --- Encode ---

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.dragOver = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.dragOver = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.dragOver = false;
        if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
            this.selectedFile = event.dataTransfer.files[0];
        }
    }

    async onEncodeFile(): Promise<void> {
        if (!this.selectedFile) return;
        this.isProcessing = true;
        try {
            this.base64Output = await this.fileToBase64(this.selectedFile);
        } catch (error) {
            console.error('Error encoding file:', error);
        } finally {
            this.isProcessing = false;
            this.cdr.detectChanges();
        }
    }

    onCopyBase64(): void {
        navigator.clipboard.writeText(this.base64Output);
    }

    // --- Decode ---

    async onDecodeBase64(): Promise<void> {
        if (!this.base64Input.trim()) return;
        this.isProcessing = true;
        try {
            const dataUrl = this.base64Input.trim();
            let mimeType = 'application/octet-stream';
            let rawBase64 = dataUrl;

            // Extract mime from data URL if present
            const match = dataUrl.match(/^data:([^;,]+)/);
            if (match) {
                mimeType = match[1];
                rawBase64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
            }

            const binary = atob(rawBase64);
            this.decodedSize = binary.length;
            this.decodedFileType = mimeType;
            this.decodedDataUrl = dataUrl.startsWith('data:') ? dataUrl : `data:${mimeType};base64,${rawBase64}`;

            // Set available extensions and auto-generate filename
            this.availableExtensions = MIME_EXTENSIONS[mimeType] || ['bin', 'txt'];
            this.downloadExtension = this.availableExtensions[0];
            this.downloadFilename = this.guessFilename(mimeType);

            if (this.isText) {
                this.decodedContent = binary;
            } else {
                this.decodedContent = `[Binary data: ${this.decodedSize} bytes]`;
            }
        } catch (error) {
            console.error('Error decoding base64:', error);
            this.decodedContent = '';
            this.decodedFileType = '';
        } finally {
            this.isProcessing = false;
            this.cdr.detectChanges();
        }
    }

    onCopyDecoded(): void {
        if (this.isText && this.decodedContent) {
            navigator.clipboard.writeText(this.decodedContent);
        }
    }

    downloadDecodedFile(): void {
        if (!this.base64Input.trim()) return;

        const dataUrl = this.base64Input.trim();
        let rawBase64 = dataUrl;
        if (dataUrl.includes(',')) {
            rawBase64 = dataUrl.split(',')[1];
        }

        const binary = atob(rawBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: this.decodedFileType });
        this.triggerDownload(blob, `${this.downloadFilename}.${this.downloadExtension}`);
    }

    // --- Common ---

    onClear(): void {
        this.selectedFile = null;
        this.base64Output = '';
        this.base64Input = '';
        this.decodedContent = '';
        this.decodedDataUrl = '';
        this.decodedFileType = '';
        this.decodedSize = 0;
        this.downloadFilename = 'decoded-file';
        this.downloadExtension = 'bin';
        this.availableExtensions = ['bin', 'txt'];
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    private guessFilename(mimeType: string): string {
        const typeMap: Record<string, string> = {
            'image/png': 'image',
            'image/jpeg': 'photo',
            'image/gif': 'animation',
            'image/svg+xml': 'vector',
            'application/pdf': 'document',
            'application/json': 'data',
            'application/xml': 'data',
            'text/plain': 'text',
            'text/html': 'page',
            'text/css': 'styles',
            'text/javascript': 'script',
        };
        return typeMap[mimeType] || 'file';
    }

    private triggerDownload(blob: Blob, filename: string): void {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
