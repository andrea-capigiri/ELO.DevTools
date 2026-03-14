import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { UtilityService } from '../../_shared/utility.service';

@Component({
  selector: 'app-timestamp-tool',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Card,
    ButtonModule,
    InputText,
    FloatLabel,
    SelectButton,
    TooltipModule,
    DatePicker,
    TranslateModule
  ],
  templateUrl: './timestamp-tool.component.html',
  styleUrls: ['./timestamp-tool.component.scss']
})
export class TimestampToolComponent implements OnInit {

  mode: 'toDate' | 'toTimestamp' = 'toDate';
  modeOptions: { label: string; value: string }[] = [];

  // Timestamp -> Date
  timestampInput: string = '';
  detectedUnit: string | null = null;
  convertedDate: Date | null = null;
  resultIso: string = '';
  resultLocale: string = '';
  resultItalian: string = '';
  resultSeconds: string = '';
  resultMilliseconds: string = '';
  inputError: string = '';

  // Date -> Timestamp
  dateInputDate: Date | null = null;
  timeInput: string = '00:00:00';
  dateResultSeconds: string = '';
  dateResultMilliseconds: string = '';
  dateResultIso: string = '';

  constructor(private utilityService: UtilityService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.modeOptions = [
      { label: this.translate.instant('timestamp.toDate'), value: 'toDate' },
      { label: this.translate.instant('timestamp.toTimestamp'), value: 'toTimestamp' }
    ];
  }

  onTimestampInputChange(): void {
    this.inputError = '';
    this.convertedDate = null;
    this.resultIso = '';
    this.resultLocale = '';
    this.resultItalian = '';
    this.resultSeconds = '';
    this.resultMilliseconds = '';
    this.detectedUnit = null;

    const trimmed = this.timestampInput.trim();
    if (!trimmed) return;

    const num = Number(trimmed);
    if (isNaN(num) || !Number.isFinite(num)) {
      this.inputError = this.translate.instant('timestamp.invalidNumber');
      return;
    }

    let ms: number;
    if (num < 1e10) {
      this.detectedUnit = this.translate.instant('timestamp.seconds');
      ms = num * 1000;
    } else {
      this.detectedUnit = this.translate.instant('timestamp.milliseconds');
      ms = num;
    }

    const date = this.utilityService.timestampToDate(ms);
    if (isNaN(date.getTime())) {
      this.inputError = this.translate.instant('timestamp.invalidTimestamp');
      return;
    }

    this.convertedDate = date;
    this.resultIso = this.utilityService.formatTimestamp(ms, 'iso');
    this.resultLocale = this.utilityService.formatTimestamp(ms, 'locale');
    this.resultItalian = this.utilityService.formatTimestamp(ms, 'custom');
    this.resultSeconds = String(Math.floor(ms / 1000));
    this.resultMilliseconds = String(ms);
  }

  onDateInputChange(): void {
    this.dateResultSeconds = '';
    this.dateResultMilliseconds = '';
    this.dateResultIso = '';

    if (!this.dateInputDate) return;

    const date = new Date(this.dateInputDate);
    const [hours, minutes, seconds] = (this.timeInput || '00:00:00').split(':').map(Number);
    date.setHours(hours || 0, minutes || 0, seconds || 0, 0);

    if (isNaN(date.getTime())) return;

    const ms = this.utilityService.dateToTimestamp(date);
    this.dateResultSeconds = String(Math.floor(ms / 1000));
    this.dateResultMilliseconds = String(ms);
    this.dateResultIso = date.toISOString();
  }

  onCurrentTimestamp(): void {
    const now = this.utilityService.getCurrentTimestamp();
    if (this.mode === 'toDate') {
      this.timestampInput = String(now);
      this.onTimestampInputChange();
    } else {
      const d = new Date(now);
      this.dateInputDate = d;
      const pad = (n: number) => n.toString().padStart(2, '0');
      this.timeInput = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      this.onDateInputChange();
    }
  }

  onCopy(text: string): void {
    navigator.clipboard.writeText(text);
  }

  onClearToDate(): void {
    this.timestampInput = '';
    this.onTimestampInputChange();
  }

  onClearToTimestamp(): void {
    this.dateInputDate = null;
    this.timeInput = '00:00:00';
    this.onDateInputChange();
  }

  get hasToDateResult(): boolean {
    return this.convertedDate !== null;
  }

  get hasToTimestampResult(): boolean {
    return this.dateResultSeconds !== '';
  }
}
