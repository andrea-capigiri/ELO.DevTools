import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToolSetting {
    id: string;
    titleKey: string;
    descriptionKey: string;
    icon: string;
    route: string;
    order: number;
    defaultEnabled: boolean;
    enabled: boolean;
    isNew?: boolean;
}

const STORAGE_KEY = 'elo-devtools-settings';

export const ALL_TOOLS: ToolSetting[] = [
    { id: 'base64', titleKey: 'tool.base64', descriptionKey: 'tool.base64.desc', icon: 'code', route: '/tools/base64', order: 1, defaultEnabled: true, enabled: true },
    { id: 'base64-file', titleKey: 'tool.base64-file', descriptionKey: 'tool.base64-file.desc', icon: 'insert_drive_file', route: '/tools/base64-file', order: 2, defaultEnabled: true, enabled: true },
    { id: 'url', titleKey: 'tool.url', descriptionKey: 'tool.url.desc', icon: 'link', route: '/tools/url', order: 3, defaultEnabled: true, enabled: true },
    { id: 'guid', titleKey: 'tool.guid', descriptionKey: 'tool.guid.desc', icon: 'fingerprint', route: '/tools/guid', order: 4, defaultEnabled: true, enabled: true },
    { id: 'hash', titleKey: 'tool.hash', descriptionKey: 'tool.hash.desc', icon: 'security', route: '/tools/hash', order: 5, defaultEnabled: true, enabled: true },
    { id: 'timestamp', titleKey: 'tool.timestamp', descriptionKey: 'tool.timestamp.desc', icon: 'schedule', route: '/tools/timestamp', order: 6, defaultEnabled: true, enabled: true },
    { id: 'jwt', titleKey: 'tool.jwt', descriptionKey: 'tool.jwt.desc', icon: 'schedule', route: '/tools/jwt', order: 7, defaultEnabled: true, enabled: true },
    { id: 'flex-preview', titleKey: 'tool.flex-preview', descriptionKey: 'tool.flex-preview.desc', icon: 'dashboard', route: '/tools/flex-preview', order: 8, defaultEnabled: true, enabled: true },
    { id: 'iban', titleKey: 'tool.iban', descriptionKey: 'tool.iban.desc', icon: 'account_balance', route: '/tools/iban', order: 9, defaultEnabled: true, enabled: true, isNew: true },
    { id: 'codice-fiscale', titleKey: 'tool.codice-fiscale', descriptionKey: 'tool.codice-fiscale.desc', icon: 'badge', route: '/tools/codice-fiscale', order: 10, defaultEnabled: false, enabled: false },
    { id: 'generatore-dati', titleKey: 'tool.generatore-dati', descriptionKey: 'tool.generatore-dati.desc', icon: 'group_add', route: '/tools/generatore-dati', order: 11, defaultEnabled: false, enabled: false },
];

@Injectable({ providedIn: 'root' })
export class SettingsService {

    public toolTitle: string = null!;
    private toolsSubject = new BehaviorSubject<ToolSetting[]>(ALL_TOOLS);
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
        const merged = ALL_TOOLS.map((tool: ToolSetting) => ({
            ...tool,
            enabled: savedMap.has(tool.id) ? savedMap.get(tool.id)! : tool.defaultEnabled
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
        const defaults = ALL_TOOLS.map(t => ({ ...t, enabled: t.defaultEnabled }));
        this.toolsSubject.next(defaults);
        this.save(defaults);
    }
}
