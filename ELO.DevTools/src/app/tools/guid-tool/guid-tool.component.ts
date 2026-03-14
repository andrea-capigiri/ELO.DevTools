import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { SelectButton } from 'primeng/selectbutton';
import { HistoryService } from '../../_shared/history.service';
import { UtilityService } from '../../_shared/utility.service';

const TOOL_ID = 'guid';

@Component({
  selector: 'app-guid-tool',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Card,
    ButtonModule,
    SelectButton,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './guid-tool.component.html',
  styleUrls: ['./guid-tool.component.scss']
})
export class GuidToolComponent implements OnInit {
  currentGuid: string = '';
  guidHistory: string[] = [];
  format: 'uppercase' | 'lowercase' = 'uppercase';
  version: 'v4' | 'v7' = 'v7';

  versionOptions = [
    { label: 'UUID v7', value: 'v7' },
    { label: 'UUID v4', value: 'v4' }
  ];

  formatOptions = [
    { label: 'UPPERCASE', value: 'uppercase' },
    { label: 'lowercase', value: 'lowercase' }
  ];

  constructor(private utilityService: UtilityService, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.guidHistory = this.historyService.load<string>(TOOL_ID);
  }

  onGenerate(): void {
    const guid = this.utilityService.generateMultipleGuids(1, this.version)[0];
    this.currentGuid = this.format === 'uppercase' ? guid.toUpperCase() : guid.toLowerCase();
    this.guidHistory = this.historyService.push(TOOL_ID, this.currentGuid);
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
  }

}
