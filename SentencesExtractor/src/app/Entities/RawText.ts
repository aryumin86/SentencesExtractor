import { IRawText } from './IRawText';

export class RawText implements IRawText {
    static maxTextId = 0;

    id: number;
    content: string;
    fileName: string;
    get contentAnnotation(): string {
        if (this.content.length < 100) {
            return this.content;
        } else {
            return this.content.substr(0, 99) + '...';
        }
    }

    constructor(c: string, f: string) {
        this.id = ++RawText.maxTextId;
        this.content = c;
        this.fileName = f;
    }
}
