import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToolSetting {
    id: string;
    titleKey: string;
    icon: string;
    enabled: boolean;
}

const STORAGE_KEY = 'elo-devtools-settings';

const DEFAULT_TOOLS: ToolSetting[] = [
    { id: 'base64', titleKey: 'tool.base64', icon: 'code', enabled: true },
    { id: 'base64-file', titleKey: 'tool.base64-file', icon: 'insert_drive_file', enabled: true },
    { id: 'url', titleKey: 'tool.url', icon: 'link', enabled: true },
    { id: 'guid', titleKey: 'tool.guid', icon: 'fingerprint', enabled: true },
    { id: 'hash', titleKey: 'tool.hash', icon: 'security', enabled: true },
    { id: 'timestamp', titleKey: 'tool.timestamp', icon: 'schedule', enabled: true },
    { id: 'jwt', titleKey: 'tool.jwt', icon: 'schedule', enabled: true },
    { id: 'flex-preview', titleKey: 'tool.flex-preview', icon: 'dashboard', enabled: true },
    { id: 'codice-fiscale', titleKey: 'tool.codice-fiscale', icon: 'badge', enabled: false },
    { id: 'generatore-dati', titleKey: 'tool.generatore-dati', icon: 'group_add', enabled: false },
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

    getToolTitleKey(toolId: string): string {
        const tool = this.toolsSubject.value.find(t => t.id === toolId);
        return tool ? tool.titleKey : '';
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
