import { environment } from "../../environments/environment";
import { BookmarkItem } from "../app.component";
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

    public topBookmarks: BookmarkItem[] = [];
    public bookmarks: BookmarkItem[] = [];

    public bookmarks_source: BookmarkItem[] = [];

    constructor() {
        this._getBookmarks().then(res => {
            let rootNode = res[0]?.children;
            this.topBookmarks = (!!rootNode) ? this._mapData(rootNode[1])?.children?.filter(t => t.type == 'bookmark') : [];
            this.bookmarks = (!!rootNode) ? this._mapData(rootNode[0])?.children : [];
        });
    }

    private _getBookmarks() {
        //if (environment.production == false)
        //    return Promise.resolve(this.bookmarks_source);

        return window.chrome.bookmarks.getTree();
    }

    private _getFaviconURL(u: string) {
        //if (environment.production == false)
        //    return 'https://placehold.co/32';

        const url = new URL(chrome.runtime.getURL("/_favicon/"));
        url.searchParams.set("pageUrl", u);
        url.searchParams.set("size", "32");
        return url.toString();
    }

    private _mapData(item: any): BookmarkItem {
        return <BookmarkItem>{
            type: (!!item.children && item.children.length > 0 && !item.url) ? 'folder' : 'bookmark',
            expanded: false,
            id: item.id,
            parentId: item.parentId,
            title: item.title,
            iconSrc: this._getFaviconURL(item.url),
            url: item.url,
            children: (!!item.children && item.children.length > 0) ? Object.values(item.children).map(c => this._mapData(c)) : []
        };
    }
}