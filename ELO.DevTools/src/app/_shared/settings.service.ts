import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToolSetting {
    id: string;
    title: string;
    icon: string;
    enabled: boolean;
}

const STORAGE_KEY = 'elo-devtools-settings';

const DEFAULT_TOOLS: ToolSetting[] = [
    { id: 'base64', title: 'Base64 Encoder/Decoder', icon: 'code', enabled: true },
    { id: 'base64-file', title: 'Base64 File Encoder/Decoder', icon: 'insert_drive_file', enabled: true },
    { id: 'url', title: 'URL Encoder/Decoder', icon: 'link', enabled: true },
    { id: 'guid', title: 'UUID Generator', icon: 'fingerprint', enabled: true },
    { id: 'hash', title: 'Hash Generator', icon: 'security', enabled: true },
    { id: 'timestamp', title: 'Timestamp Converter', icon: 'schedule', enabled: true },
    { id: 'jwt', title: 'JWT Inspector', icon: 'schedule', enabled: true },
    { id: 'codice-fiscale', title: 'Codice Fiscale', icon: 'badge', enabled: false },
    { id: 'generatore-dati', title: 'Generatore Dati', icon: 'group_add', enabled: false },
];

@Injectable({ providedIn: 'root' })
export class SettingsService {
    private toolsSubject = new BehaviorSubject<ToolSetting[]>(DEFAULT_TOOLS);
    tools$: Observable<ToolSetting[]> = this.toolsSubject.asObservable();

    constructor() {
        this.load();
    }

    private async load(): Promise<void> {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                const result = await chrome.storage.local.get(STORAGE_KEY);
                if (result[STORAGE_KEY]) {
                    this.mergeSettings(result[STORAGE_KEY]);
                }
            } else {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    this.mergeSettings(JSON.parse(stored));
                }
            }
        } catch {
            // Use defaults on error
        }
    }

    private mergeSettings(saved: Partial<ToolSetting>[]): void {
        const savedMap = new Map(saved.map(s => [s.id, s.enabled]));
        const merged = DEFAULT_TOOLS.map(tool => ({
            ...tool,
            enabled: savedMap.has(tool.id) ? savedMap.get(tool.id)! : tool.enabled
        }));
        this.toolsSubject.next(merged);
    }

    private async save(tools: ToolSetting[]): Promise<void> {
        const data = tools.map(t => ({ id: t.id, enabled: t.enabled }));
        try {
            if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                await chrome.storage.local.set({ [STORAGE_KEY]: data });
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
        } catch {
            // Silently fail
        }
    }

    getTools(): ToolSetting[] {
        return this.toolsSubject.value;
    }

    isEnabled(toolId: string): boolean {
        return this.toolsSubject.value.find(t => t.id === toolId)?.enabled ?? false;
    }

    toggleTool(toolId: string, enabled: boolean): void {
        const tools = this.toolsSubject.value.map(t =>
            t.id === toolId ? { ...t, enabled } : t
        );
        this.toolsSubject.next(tools);
        this.save(tools);
    }

    enableAll(): void {
        const tools = this.toolsSubject.value.map(t => ({ ...t, enabled: true }));
        this.toolsSubject.next(tools);
        this.save(tools);
    }

    disableAll(): void {
        const tools = this.toolsSubject.value.map(t => ({ ...t, enabled: false }));
        this.toolsSubject.next(tools);
        this.save(tools);
    }

    resetDefaults(): void {
        this.toolsSubject.next([...DEFAULT_TOOLS]);
        this.save(DEFAULT_TOOLS);
    }
}
