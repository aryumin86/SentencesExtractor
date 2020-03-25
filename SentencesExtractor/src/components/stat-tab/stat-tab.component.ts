import { Component, OnInit, Inject } from '@angular/core';
import { LingvService } from 'src/services/Lingv/Lingv.service';
import { WordForm } from 'src/app/Entities/WordForm';
import { WordFreq } from 'src/app/Entities/WordFreq';
import { Fragment } from 'src/app/Entities/Fragment';
import { DataService } from 'src/services/Data/data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WordFormsModalComponent } from '../word-forms-modal/word-forms-modal.component';

@Component({
  selector: 'app-stat-tab',
  templateUrl: './stat-tab.component.html',
  styleUrls: ['./stat-tab.component.css']
})
export class StatTabComponent implements OnInit {
  biGrammsBaseInput: string;
  maxElemsToShowSelect: string;
  maxElemsToShow: number;
  stopWords: Set<string>;
  words: string[];
  wordsFreqs: Array<WordFreq>;
  fragments: Array<Fragment>;
  wordsFreqsMode: boolean;
  toWordsSlitterRegex: RegExp;
  minFreq: number;
  biGrammsMode: boolean;
  removeStopWords: boolean;
  selectAll: boolean;
  wordsFreqsToUseForMatrixExport: Array<WordFreq>;
  sortBy: string;

  constructor(private lingvService: LingvService, private dataService: DataService, public dialog: MatDialog) {
    this.biGrammsBaseInput = '';
    this.maxElemsToShow = 500;
    this.maxElemsToShowSelect = '500';
    this.stopWords = new Set();
    this.stopWords = this.lingvService.getRusStopWords();
    this.words = [];
    this.wordsFreqs = new Array<WordFreq>();
    this.fragments = new Array<Fragment>();
    this.toWordsSlitterRegex = /[\s\r\n\t,:;\"'“№%*\()\[\]\/\\”$@^&{}<>~`_]/;
    this.minFreq = 5;
    this.biGrammsMode = false;
    this.removeStopWords = true;
    this.selectAll = false;
    this.wordsFreqsToUseForMatrixExport = new Array<WordFreq>();
    this.sortBy = 'freq';
  }

  ngOnInit() {
    this.dataService.currentFragmentsArray.subscribe(aa => { this.fragments = this.cleanFragments(aa); });
  }

  cleanFragments(frags: Array<Fragment>): Array<Fragment>{
    frags.forEach((t:Fragment) => {
      t.content = t.content.replace('"', ' ');
      t.content = t.content.replace('\'', ' ');
      t.content = t.content.replace('“', ' ');
      t.content = t.content.replace('”', ' ');
      t.content = t.content.replace('\r', ' ');
      t.content = t.content.replace('\n', ' ');
      t.content = t.content.replace('\t', ' ');
      t.content = t.content.replace('-', ' ');
      t.content = t.content.replace('-', ' ');
      t.content = t.content.trim();
    });
    return frags;
  }

  maxElemsToShowChanged(event): void {
    this.maxElemsToShow = Number.parseInt(event.value);
  }

  setWordForms(): void {
    this.clearWordsFromBadSymbols();
    if (this.biGrammsBaseInput.length === 0) {
      return;
    }
    const rawWords = [];
    this.biGrammsBaseInput.trim().split(' ').forEach(w => {
      rawWords.push(w.toLowerCase());
    });
    this.words = [... new Set(rawWords)];
    const wordsForms = new Set<string>();
    this.words.forEach(w => {
      wordsForms.add(w);
      this.lingvService.getWordForm(w).subscribe((x: WordForm[]) => {
        x.forEach(f => {
          wordsForms.add(f.raw);
          this.words = [...wordsForms];
          this.biGrammsBaseInput = this.words.join(' ');
        });
      });
    });
  }

  clearWordsFromBadSymbols(): void {
    let res = '';
    Array.from(this.biGrammsBaseInput).forEach(ch => {
      if (ch.match(/[a-zA-Zа-яА-Я0-9\s]/i)) {
        res += ch;
      }
    });
    this.biGrammsBaseInput = res;
  }

  calculateWordsFreqs(): void{
    this.biGrammsMode = false;
    this.wordsFreqs = [];
    var freqs: {[word: string]: number } = {};
    this.fragments.forEach((f: Fragment) => {
      // токенизация и очистка
      let fragWords: Array<string> = f.content.split(this.toWordsSlitterRegex).filter(x => x.length > 0);
        fragWords = fragWords
          .filter(w => w !== undefined && w.length > 0)
          .map(w => this.lingvService.trimWord(w));
        // подсчет частот
        fragWords.forEach((w: string) => {
          w = w.toLowerCase().trim();
          if(!freqs[w]){
            freqs[w] = 1;
          }
          else{
            freqs[w]++;
          }
        });
    });

    // отсеить не имеющие минимальной частоты (minFreq) из freqs и добавить в итоговый массив
    let counter = 0;
    Object.keys(freqs).forEach((w: string) => {
      if(freqs[w] >= this.minFreq){
        if(!this.removeStopWords || this.removeStopWords && !this.stopWords.has(w)){
          const wf = new WordFreq();
          wf.id = counter++;
          wf.content = w;
          wf.freq = freqs[w];
          this.wordsFreqs.push(wf);
        }
      }
    });

    this.wordsFreqs = this.wordsFreqs.sort((a,b) => b.freq - a.freq);
  }

  calculateBiGrammsFreqs(): void {
    console.log(this.removeStopWords)
    this.biGrammsMode = true;
    this.wordsFreqs = [];
    var freqs: {[word: string]: number } = {};
    const rawWords = [];
    this.biGrammsBaseInput.trim().split(' ').forEach(w => {
      rawWords.push(w.toLowerCase());
    });
    const bigrammsBaseSet = new Set(rawWords);
    const bigrammsBase = rawWords[0].toLowerCase().trim();

    for(let i = 0; i < this.fragments.length; i++){
      let fragWords: Array<string> = this.fragments[i].content.split(this.toWordsSlitterRegex).filter(x => x.length > 0);
      fragWords = fragWords
        .filter(w => w !== undefined && w.length > 0)
        .map(w => this.lingvService.trimWord(w));

      for(var w = 0; w < fragWords.length; w++){
        if(bigrammsBaseSet.has(fragWords[w]) && w+1 != fragWords.length){
          //const biGramm = 
          //  fragWords[w].toLowerCase().trim() + ' ' + fragWords[w+1].toLowerCase().trim();
          
          const biGramm = bigrammsBase + ' ' + fragWords[w+1].toLowerCase().trim();
          if(!freqs[biGramm]){
            freqs[biGramm] = 1;
          }
          else{
            freqs[biGramm]++;
          }
          
        }
      }
    }

    // отсеить не имеющие минимальной частоты (minFreq) из freqs и добавить в итоговый массив
    let counter = 0;
    Object.keys(freqs).forEach((w: string) => {
      if(freqs[w] >= this.minFreq && !w.match(/\s+/)){
        if(!this.removeStopWords || this.removeStopWords && !this.stopWords.has(w.split(' ')[1])){
          const wf = new WordFreq();
          wf.id = counter++;
          wf.content = w;
          wf.freq = freqs[w];
          this.wordsFreqs.push(wf);
        }
      }
    });

    this.wordsFreqs = this.wordsFreqs.sort((a,b) => b.freq - a.freq);
  }

  deleteWordFreq(id: number) {
    this.wordsFreqs = this.wordsFreqs.filter(wf => wf.id != id);
  }

  selectAllChBChanged(val: boolean): void {
    this.selectAll = !this.selectAll;
    if(this.selectAll === true) {
      this.wordsFreqs.forEach((wf: WordFreq) => {
        this.wordsFreqsToUseForMatrixExport.push(wf);
        wf.useForMatrix = true;
      });
    }
    else {
      this.wordsFreqsToUseForMatrixExport = [];
      this.wordsFreqs.forEach((wf: WordFreq) => {
        wf.useForMatrix = false;
      });
    }
    
  }

  sorByChanged(event): void {
    this.sortBy = event.value;
    if(this.sortBy == 'freq'){
      this.wordsFreqs = this.wordsFreqs.sort((a,b) => b.freq - a.freq);
    }
    else {
      this.wordsFreqs = this.wordsFreqs.sort((a,b) => (b.content > a.content) ? -1 : (a.content < b.content) ? 1 : 0);
    }
  }

  openWordFormsDialog(wf: WordFreq): void {
    const dialogRef = this.dialog.open(WordFormsModalComponent, {
      data: wf,
      // maxHeight: '30vw'
    });
  }

}
