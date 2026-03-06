import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';

interface FlexOption {
    label: string;
    value: string;
    bsClass: string;
}

@Component({
    selector: 'app-flex-preview-tool',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSliderModule,
        RouterModule
    ],
    templateUrl: './flex-preview-tool.component.html',
    styleUrls: ['./flex-preview-tool.component.scss']
})
export class FlexPreviewToolComponent {
    directions: FlexOption[] = [
        { label: 'Row', value: 'row', bsClass: 'flex-row' },
        { label: 'Row Reverse', value: 'row-reverse', bsClass: 'flex-row-reverse' },
        { label: 'Column', value: 'column', bsClass: 'flex-column' },
        { label: 'Col Reverse', value: 'column-reverse', bsClass: 'flex-column-reverse' },
    ];

    wraps: FlexOption[] = [
        { label: 'No Wrap', value: 'nowrap', bsClass: 'flex-nowrap' },
        { label: 'Wrap', value: 'wrap', bsClass: 'flex-wrap' },
        { label: 'Wrap Reverse', value: 'wrap-reverse', bsClass: 'flex-wrap-reverse' },
    ];

    justifyOptions: FlexOption[] = [
        { label: 'Start', value: 'flex-start', bsClass: 'justify-content-start' },
        { label: 'End', value: 'flex-end', bsClass: 'justify-content-end' },
        { label: 'Center', value: 'center', bsClass: 'justify-content-center' },
        { label: 'Between', value: 'space-between', bsClass: 'justify-content-between' },
        { label: 'Around', value: 'space-around', bsClass: 'justify-content-around' },
        { label: 'Evenly', value: 'space-evenly', bsClass: 'justify-content-evenly' },
    ];

    alignOptions: FlexOption[] = [
        { label: 'Start', value: 'flex-start', bsClass: 'align-items-start' },
        { label: 'End', value: 'flex-end', bsClass: 'align-items-end' },
        { label: 'Center', value: 'center', bsClass: 'align-items-center' },
        { label: 'Stretch', value: 'stretch', bsClass: 'align-items-stretch' },
        { label: 'Baseline', value: 'baseline', bsClass: 'align-items-baseline' },
    ];

    gapOptions: FlexOption[] = [
        { label: '0', value: '0', bsClass: 'gap-0' },
        { label: '1', value: '0.25rem', bsClass: 'gap-1' },
        { label: '2', value: '0.5rem', bsClass: 'gap-2' },
        { label: '3', value: '1rem', bsClass: 'gap-3' },
        { label: '4', value: '1.5rem', bsClass: 'gap-4' },
        { label: '5', value: '3rem', bsClass: 'gap-5' },
    ];

    direction = 'row';
    wrap = 'nowrap';
    justify = 'flex-start';
    align = 'stretch';
    gap = '1rem';
    itemCount = 5;

    get previewStyle(): Record<string, string> {
        return {
            display: 'flex',
            'flex-direction': this.direction,
            'flex-wrap': this.wrap,
            'justify-content': this.justify,
            'align-items': this.align,
            gap: this.gap,
        };
    }

    get items(): number[] {
        return Array.from({ length: this.itemCount }, (_, i) => i + 1);
    }

    get bootstrapClasses(): string {
        const classes = ['d-flex'];
        const find = (opts: FlexOption[], val: string) => opts.find(o => o.value === val)?.bsClass ?? '';
        classes.push(find(this.directions, this.direction));
        if (this.wrap !== 'nowrap') classes.push(find(this.wraps, this.wrap));
        if (this.justify !== 'flex-start') classes.push(find(this.justifyOptions, this.justify));
        if (this.align !== 'stretch') classes.push(find(this.alignOptions, this.align));
        classes.push(find(this.gapOptions, this.gap));
        return classes.filter(Boolean).join(' ');
    }

    get cssCode(): string {
        const lines = ['display: flex;'];
        if (this.direction !== 'row') lines.push(`flex-direction: ${this.direction};`);
        if (this.wrap !== 'nowrap') lines.push(`flex-wrap: ${this.wrap};`);
        if (this.justify !== 'flex-start') lines.push(`justify-content: ${this.justify};`);
        if (this.align !== 'stretch') lines.push(`align-items: ${this.align};`);
        if (this.gap !== '0') lines.push(`gap: ${this.gap};`);
        return lines.join('\n');
    }

    onCopy(text: string): void {
        navigator.clipboard.writeText(text);
    }

    addItem(): void {
        if (this.itemCount < 12) this.itemCount++;
    }

    removeItem(): void {
        if (this.itemCount > 1) this.itemCount--;
    }
}
