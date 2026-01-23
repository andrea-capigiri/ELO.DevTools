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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-base64-file-tool',
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
        RouterModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './base64-file-tool.component.html',
    styleUrls: ['./base64-file-tool.component.scss']
})
export class Base64FileToolComponent {
    selectedFile: File | null = null;
    base64Output: string = '';
    decodedFileName: string = '';
    decodedFileType: string = '';
    decodedContent: string = '';
    mode: 'encode' | 'decode' = 'encode';
    isProcessing: boolean = false;
    dragOver: boolean = false;

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
        }
    }

    fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result);
            };
            reader.onerror = error => reject(error);
        });
    }

    async onDecodeBase64(): Promise<void> {
        if (!this.base64Output.trim()) return;

        this.isProcessing = true;
        try {
            const response = await fetch(this.base64Output);
            const blob = await response.blob();

            this.decodedFileType = blob.type || 'application/octet-stream';
            this.decodedContent = this.base64Output;
        } catch (error) {
            console.error('Error decoding base64:', error);
            try {
                const cleanBase64 = this.base64Output.includes(',')
                    ? this.base64Output.split(',')[1]
                    : this.base64Output;

                const decoded = atob(cleanBase64);
                this.decodedContent = decoded;
                this.decodedFileType = 'text/plain';
            } catch (decodeError) {
                console.error('Invalid base64:', decodeError);
            }
        } finally {
            this.isProcessing = false;
        }
    }

    downloadDecodedFile(): void {
        if (!this.decodedContent) return;

        const link = document.createElement('a');
        link.href = this.decodedContent;
        link.download = this.decodedFileName || 'decoded-file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadBase64AsFile(): void {
        if (!this.base64Output) return;

        const blob = new Blob([this.base64Output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'base64-output.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    onSwap(): void {
        const temp = this.base64Output;
        this.base64Output = this.decodedContent;
        this.decodedContent = temp;
        this.mode = this.mode === 'encode' ? 'decode' : 'encode';
    }

    onClear(): void {
        this.selectedFile = null;
        this.base64Output = '';
        this.decodedContent = '';
        this.decodedFileName = '';
        this.decodedFileType = '';
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    onCopy(): void {
        if (this.mode === 'encode' && this.base64Output) {
            navigator.clipboard.writeText(this.base64Output);
        } else if (this.decodedContent) {
            navigator.clipboard.writeText(this.decodedContent);
        }
    }
}