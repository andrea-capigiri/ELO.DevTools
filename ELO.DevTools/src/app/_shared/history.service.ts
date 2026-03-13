import { Injectable } from '@angular/core';

const MAX_HISTORY = 10;

@Injectable({ providedIn: 'root' })
export class HistoryService {

    private key(toolId: string): string {
        return `elo-devtools-history-${toolId}`;
    }

    load<T>(toolId: string): T[] {
        try {
            const raw = localStorage.getItem(this.key(toolId));
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    save<T>(toolId: string, items: T[]): void {
        try {
            localStorage.setItem(this.key(toolId), JSON.stringify(items.slice(0, MAX_HISTORY)));
        } catch {
            // Silently fail
        }
    }

    push<T>(toolId: string, item: T): T[] {
        const items = this.load<T>(toolId);
        items.unshift(item);
        const trimmed = items.slice(0, MAX_HISTORY);
        this.save(toolId, trimmed);
        return trimmed;
    }

    clear(toolId: string): void {
        try {
            localStorage.removeItem(this.key(toolId));
        } catch {
            // Silently fail
        }
    }

    clearAll(): void {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('elo-devtools-history-'));
            keys.forEach(k => localStorage.removeItem(k));
        } catch {
            // Silently fail
        }
    }
}
