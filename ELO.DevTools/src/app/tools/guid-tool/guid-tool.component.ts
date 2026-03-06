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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatButtonToggleModule
  ],
  templateUrl: './guid-tool.component.html',
  styleUrls: ['./guid-tool.component.scss']
})
export class GuidToolComponent {
  currentGuid: string = '';
  guidHistory: string[] = [];
  format: 'uppercase' | 'lowercase' = 'uppercase';
  version: 'v4' | 'v7' = 'v7';

  constructor(private utilityService: UtilityService) {}

  onGenerate(): void {
    const guid = this.utilityService.generateMultipleGuids(1, this.version)[0];
    this.currentGuid = this.format === 'uppercase' ? guid.toUpperCase() : guid.toLowerCase();
    this.guidHistory.unshift(this.currentGuid);

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

}