import { Injectable } from '@angular/core';

export interface IbanCountry {
    code: string;
    ibanLength: number;
    bbanFormat: string;
    segments: IbanSegment[];
}

export interface IbanSegment {
    /** Translation key suffix, e.g. 'countryCode' → used as 'iban.segments.countryCode' */
    key: string;
    start: number;
    length: number;
}

export interface GeneratedIban {
    iban: string;
    ibanFormatted: string;
    country: IbanCountry;
    segments: { segment: IbanSegment; value: string }[];
}

const seg = (key: string, start: number, length: number): IbanSegment => ({ key, start, length });

const IBAN_COUNTRIES: IbanCountry[] = [
    {
        code: 'IT', ibanLength: 27, bbanFormat: '1a 5n 5n 12c',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('cin', 4, 1), seg('abi', 5, 5), seg('cab', 10, 5), seg('accountNumber', 15, 12)
        ]
    },
    {
        code: 'DE', ibanLength: 22, bbanFormat: '8n 10n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 8), seg('accountNumber', 12, 10)
        ]
    },
    {
        code: 'FR', ibanLength: 27, bbanFormat: '5n 5n 11c 2n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 5), seg('branchCode', 9, 5), seg('accountNumber', 14, 11), seg('nationalCheck', 25, 2)
        ]
    },
    {
        code: 'ES', ibanLength: 24, bbanFormat: '4n 4n 2n 10n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('branchCode', 8, 4), seg('nationalCheck', 12, 2), seg('accountNumber', 14, 10)
        ]
    },
    {
        code: 'GB', ibanLength: 22, bbanFormat: '4a 6n 8n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('sortCode', 8, 6), seg('accountNumber', 14, 8)
        ]
    },
    {
        code: 'CH', ibanLength: 21, bbanFormat: '5n 12c',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 5), seg('accountNumber', 9, 12)
        ]
    },
    {
        code: 'AT', ibanLength: 20, bbanFormat: '5n 11n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 5), seg('accountNumber', 9, 11)
        ]
    },
    {
        code: 'PT', ibanLength: 25, bbanFormat: '4n 4n 11n 2n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('branchCode', 8, 4), seg('accountNumber', 12, 11), seg('nationalCheck', 23, 2)
        ]
    },
    {
        code: 'NL', ibanLength: 18, bbanFormat: '4a 10n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('accountNumber', 8, 10)
        ]
    },
    {
        code: 'BE', ibanLength: 16, bbanFormat: '3n 7n 2n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 3), seg('accountNumber', 7, 7), seg('nationalCheck', 14, 2)
        ]
    },
    {
        code: 'PL', ibanLength: 28, bbanFormat: '8n 16n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('sortCode', 4, 8), seg('accountNumber', 12, 16)
        ]
    },
    {
        code: 'SE', ibanLength: 24, bbanFormat: '3n 16n 1n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 3), seg('accountNumber', 7, 17)
        ]
    },
    {
        code: 'NO', ibanLength: 15, bbanFormat: '4n 6n 1n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('accountNumber', 8, 7)
        ]
    },
    {
        code: 'DK', ibanLength: 18, bbanFormat: '4n 9n 1n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('accountNumber', 8, 10)
        ]
    },
    {
        code: 'IE', ibanLength: 22, bbanFormat: '4a 6n 8n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('branchCode', 8, 6), seg('accountNumber', 14, 8)
        ]
    },
    {
        code: 'GR', ibanLength: 27, bbanFormat: '3n 4n 16c',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 3), seg('branchCode', 7, 4), seg('accountNumber', 11, 16)
        ]
    },
    {
        code: 'RO', ibanLength: 24, bbanFormat: '4a 16c',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('accountNumber', 8, 16)
        ]
    },
    {
        code: 'CZ', ibanLength: 24, bbanFormat: '4n 6n 10n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 4), seg('accountPrefix', 8, 6), seg('accountNumber', 14, 10)
        ]
    },
    {
        code: 'HU', ibanLength: 28, bbanFormat: '3n 4n 1n 15n 1n',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 3), seg('branchCode', 7, 4), seg('accountNumber', 11, 17)
        ]
    },
    {
        code: 'LU', ibanLength: 20, bbanFormat: '3n 13c',
        segments: [
            seg('countryCode', 0, 2), seg('checkDigits', 2, 2),
            seg('bankCode', 4, 3), seg('accountNumber', 7, 13)
        ]
    }
];

/** Countries that use alpha characters for bank code in BBAN */
const ALPHA_BANK_CODE_COUNTRIES = new Set(['GB', 'IE', 'NL', 'RO']);

@Injectable({ providedIn: 'root' })
export class IbanService {

    getCountries(): IbanCountry[] {
        return [...IBAN_COUNTRIES].sort((a, b) => a.code.localeCompare(b.code));
    }

    getCountry(code: string): IbanCountry | undefined {
        return IBAN_COUNTRIES.find(c => c.code === code);
    }

    generate(countryCode: string): GeneratedIban | null {
        const country = this.getCountry(countryCode);
        if (!country) return null;

        const bban = this.generateBban(country);
        const checkDigits = this.calculateCheckDigits(countryCode, bban);
        const iban = countryCode + checkDigits + bban;

        return {
            iban,
            ibanFormatted: this.formatIban(iban),
            country,
            segments: country.segments.map(s => ({
                segment: s,
                value: iban.substring(s.start, s.start + s.length)
            }))
        };
    }

    formatIban(iban: string): string {
        return iban.replace(/(.{4})/g, '$1 ').trim();
    }

    private generateBban(country: IbanCountry): string {
        if (country.code === 'IT') {
            return this.randomAlpha(1) + this.randomDigits(5) + this.randomDigits(5) + this.randomDigits(12);
        }

        if (ALPHA_BANK_CODE_COUNTRIES.has(country.code)) {
            return this.buildBbanFromSegments(country, true);
        }

        return this.randomDigits(country.ibanLength - 4);
    }

    private buildBbanFromSegments(country: IbanCountry, alphaBankCode: boolean): string {
        let bban = '';
        for (const s of country.segments.slice(2)) {
            if (alphaBankCode && s.key === 'bankCode') {
                bban += this.randomAlpha(s.length);
            } else {
                bban += this.randomDigits(s.length);
            }
        }
        return bban;
    }

    private calculateCheckDigits(countryCode: string, bban: string): string {
        const rearranged = bban + countryCode + '00';
        const numeric = this.lettersToNumbers(rearranged);
        const remainder = this.mod97(numeric);
        const check = 98 - remainder;
        return check.toString().padStart(2, '0');
    }

    private lettersToNumbers(str: string): string {
        return str.split('').map(ch => {
            const code = ch.charCodeAt(0);
            if (code >= 65 && code <= 90) return (code - 55).toString();
            if (code >= 97 && code <= 122) return (code - 87).toString();
            return ch;
        }).join('');
    }

    private mod97(numStr: string): number {
        let remainder = 0;
        for (let i = 0; i < numStr.length; i++) {
            remainder = (remainder * 10 + parseInt(numStr[i], 10)) % 97;
        }
        return remainder;
    }

    private randomDigits(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    private randomAlpha(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
}
