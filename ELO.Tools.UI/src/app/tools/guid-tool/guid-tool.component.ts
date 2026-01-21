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
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { UtilityService } from '../../_shared/utility.service';

@Component({
  selector: 'app-guid-tool',
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
    MatSelectModule,
    MatSliderModule
  ],
  templateUrl: './guid-tool.component.html',
  styleUrls: ['./guid-tool.component.scss']
})
export class GuidToolComponent {
  currentGuid: string = '';
  guidHistory: string[] = [];
  generateCount: number = 1;
  format: 'uppercase' | 'lowercase' = 'uppercase';

  constructor(private utilityService: UtilityService) {}

  onGenerate(): void {
    const newGuids = this.utilityService.generateMultipleGuids(this.generateCount);
    newGuids.forEach(guid => {
      const formattedGuid = this.format === 'uppercase' ? guid.toUpperCase() : guid.toLowerCase();
      this.guidHistory.unshift(formattedGuid);
    });
    
    if (newGuids.length > 0) {
      this.currentGuid = this.format === 'uppercase' ? newGuids[0].toUpperCase() : newGuids[0].toLowerCase();
    }
    
    // Keep only last 50 generated GUIDs
    if (this.guidHistory.length > 50) {
      this.guidHistory = this.guidHistory.slice(0, 50);
    }
  }

  onCopy(guid: string): void {
    navigator.clipboard.writeText(guid);
  }

  onCopyAll(): void {
    const allGuids = this.guidHistory.join('\n');
    navigator.clipboard.writeText(allGuids);
  }

  onClear(): void {
    this.currentGuid = '';
    this.guidHistory = [];
  }

  onFormatChange(): void {
    if (this.currentGuid) {
      this.currentGuid = this.format === 'uppercase' ? 
        this.currentGuid.toUpperCase() : 
        this.currentGuid.toLowerCase();
    }
    
    this.guidHistory = this.guidHistory.map(guid => 
      this.format === 'uppercase' ? guid.toUpperCase() : guid.toLowerCase()
    );
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}