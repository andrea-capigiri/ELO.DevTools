import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
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
    generateGuid(version: 'v4' | 'v7' = 'v7'): string {
        return version === 'v7' ? this.generateUuidV7() : this.generateUuidV4();
    }

    generateMultipleGuids(count: number, version: 'v4' | 'v7' = 'v7'): string[] {
        const guids: string[] = [];
        for (let i = 0; i < count; i++) {
            guids.push(this.generateGuid(version));
        }
        return guids;
    }

    private generateUuidV4(): string {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
        return this.formatUuid(bytes);
    }

    private generateUuidV7(): string {
        const now = Date.now();
        const bytes = crypto.getRandomValues(new Uint8Array(16));

        // 48-bit timestamp (ms since epoch) in bytes 0-5
        bytes[0] = (now / 2 ** 40) & 0xff;
        bytes[1] = (now / 2 ** 32) & 0xff;
        bytes[2] = (now / 2 ** 24) & 0xff;
        bytes[3] = (now / 2 ** 16) & 0xff;
        bytes[4] = (now / 2 ** 8) & 0xff;
        bytes[5] = now & 0xff;

        bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

        return this.formatUuid(bytes);
    }

    private formatUuid(bytes: Uint8Array): string {
        const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
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

    // Hash operations
    async generateHash(text: string, algorithm: 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512' = 'sha256'): Promise<string> {
        if (algorithm === 'md5') {
            return this.md5(text);
        }
        const algoMap: Record<string, string> = {
            'sha1': 'SHA-1',
            'sha256': 'SHA-256',
            'sha384': 'SHA-384',
            'sha512': 'SHA-512'
        };
        const encoded = new TextEncoder().encode(text);
        const buffer = await crypto.subtle.digest(algoMap[algorithm], encoded);
        return Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('');
    }

    private md5(str: string): string {
        const toUTF8 = (s: string): number[] => {
            const bytes: number[] = [];
            for (let i = 0; i < s.length; i++) {
                let c = s.charCodeAt(i);
                if (c < 0x80) bytes.push(c);
                else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
                else if (c < 0xd800 || c >= 0xe000) { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
                else { i++; c = 0x10000 + (((c & 0x3ff) << 10) | (s.charCodeAt(i) & 0x3ff)); bytes.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
            }
            return bytes;
        };

        const bytes = toUTF8(str);
        const len = bytes.length;
        const bitLen = len * 8;

        bytes.push(0x80);
        while (bytes.length % 64 !== 56) bytes.push(0);

        for (let i = 0; i < 8; i++) bytes.push((bitLen >>> (i * 8)) & 0xff);

        const S = (s: number, x: number) => (x << s) | (x >>> (32 - s));
        const add = (a: number, b: number) => (a + b) | 0;

        const T = new Array(64);
        for (let i = 0; i < 64; i++) T[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000);

        let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

        const s_table = [
            7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
            5, 9,14,20, 5, 9,14,20, 5, 9,14,20, 5, 9,14,20,
            4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
            6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
        ];

        for (let offset = 0; offset < bytes.length; offset += 64) {
            const M = new Array(16);
            for (let j = 0; j < 16; j++) {
                M[j] = bytes[offset + j * 4] | (bytes[offset + j * 4 + 1] << 8) |
                       (bytes[offset + j * 4 + 2] << 16) | (bytes[offset + j * 4 + 3] << 24);
            }

            let A = a0, B = b0, C = c0, D = d0;

            for (let i = 0; i < 64; i++) {
                let F: number, g: number;
                if (i < 16) { F = (B & C) | (~B & D); g = i; }
                else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
                else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
                else { F = C ^ (B | ~D); g = (7 * i) % 16; }

                F = add(add(F, A), add(T[i], M[g]));
                A = D; D = C; C = B; B = add(B, S(s_table[i], F));
            }

            a0 = add(a0, A); b0 = add(b0, B); c0 = add(c0, C); d0 = add(d0, D);
        }

        const toHex = (n: number) => {
            let h = '';
            for (let i = 0; i < 4; i++) h += ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0');
            return h;
        };
        return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
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