export class WordFreq {
    id: number;
    content: string;
    freq: number;
    needWordForms: boolean;
    forms: Array<string>;
    useForMatrix: boolean;

    constructor(){
        this.needWordForms = false;
        this.useForMatrix = false;
    }
}
