import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  // Base64 operations
  base64Encode(str: string): string {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      return 'Error: Invalid input';
    }
  }
  
  base64Decode(base64: string): string {
    try {
      return decodeURIComponent(escape(atob(base64)));
    } catch (e) {
      return 'Error: Invalid Base64 string';
    }
  }
  
  // URL operations
  urlEncode(str: string): string {
    return encodeURIComponent(str);
  }
  
  urlDecode(encodedStr: string): string {
    try {
      return decodeURIComponent(encodedStr);
    } catch (e) {
      return 'Error: Invalid URL encoded string';
    }
  }
  
  // Generate GUID
  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  generateMultipleGuids(count: number): string[] {
    const guids: string[] = [];
    for (let i = 0; i < count; i++) {
      guids.push(this.generateGuid());
    }
    return guids;
  }
  
  // JSON operations
  formatJson(jsonString: string): { formatted: string; valid: boolean; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      return {
        formatted: JSON.stringify(parsed, null, 2),
        valid: true
      };
    } catch (e) {
      return {
        formatted: jsonString,
        valid: false,
        error: e instanceof Error ? e.message : 'Invalid JSON'
      };
    }
  }
  
  minifyJson(jsonString: string): { minified: string; valid: boolean; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      return {
        minified: JSON.stringify(parsed),
        valid: true
      };
    } catch (e) {
      return {
        minified: jsonString,
        valid: false,
        error: e instanceof Error ? e.message : 'Invalid JSON'
      };
    }
  }
  
  // Hash operations (simplified versions)
  generateHash(text: string, algorithm: 'md5' | 'sha1' | 'sha256' = 'sha256'): string {
    // Simple hash implementations (for demo purposes)
    // In a real app, you'd use crypto-js or similar library
    switch (algorithm) {
      case 'md5':
        return this.simpleMd5(text);
      case 'sha1':
        return this.simpleSha1(text);
      case 'sha256':
      default:
        return this.simpleSha256(text);
    }
  }
  
  private simpleMd5(str: string): string {
    // This is a placeholder - in real implementation use crypto-js
    return btoa(str).substring(0, 32).replace(/[+/=]/g, '0');
  }
  
  private simpleSha1(str: string): string {
    // This is a placeholder - in real implementation use crypto-js
    return btoa(str + 'sha1').substring(0, 40).replace(/[+/=]/g, '0');
  }
  
  private simpleSha256(str: string): string {
    // This is a placeholder - in real implementation use crypto-js
    return btoa(str + 'sha256').substring(0, 64).replace(/[+/=]/g, '0');
  }
  
  // Timestamp operations
  timestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }
  
  dateToTimestamp(date: Date): number {
    return date.getTime();
  }
  
  getCurrentTimestamp(): number {
    return Date.now();
  }
  
  formatTimestamp(timestamp: number, format: 'iso' | 'locale' | 'custom' = 'locale'): string {
    const date = new Date(timestamp);
    switch (format) {
      case 'iso':
        return date.toISOString();
      case 'locale':
        return date.toLocaleString();
      case 'custom':
        return date.toLocaleDateString('it-IT') + ' ' + date.toLocaleTimeString('it-IT');
      default:
        return date.toString();
    }
  }
}