export class Fragment {
    id: number;
    textId: number;
    content: string;
    fragmentSartIndex: number;
    fragmentEndIndex: number;
    wordStartIndex: number;
    wordEndIndex: number;

    getCntentWithHighlightedWords(words: Array<string>): string{
        // TODO формировать html с подсветкой слов
        return this.content;
    }
}
