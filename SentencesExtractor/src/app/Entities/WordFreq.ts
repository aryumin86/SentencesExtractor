import { WordForm } from './WordForm';

export class WordFreq {
    id: number;
    content: string;
    freq: number;
    needWordForms: boolean;
    forms: Array<WordForm>;
    useForMatrix: boolean;

    constructor(){
        this.needWordForms = false;
        this.useForMatrix = false;
    }
}
