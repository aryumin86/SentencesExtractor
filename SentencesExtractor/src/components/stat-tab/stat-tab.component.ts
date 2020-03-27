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
        if (!w.match(/^[\s]+$/) && w.length > 0){
          if(!freqs[w]){
            freqs[w] = 1;
          }
          else{
            freqs[w]++;
          }
        }
      });
    });

    // отсеить не имеющие минимальной частоты (minFreq) из freqs и добавить в итоговый массив
    let counter = 0;
    Object.keys(freqs).forEach((w: string) => {
      if(!this.removeStopWords || this.removeStopWords && !this.stopWords.has(w)){
        const wf = new WordFreq();
        wf.id = counter++;
        wf.content = w;
        wf.freq = freqs[w];
        this.wordsFreqs.push(wf);
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
      let fragWords: Array<string> = 
        this.fragments[i].content.split(this.toWordsSlitterRegex)
        .filter(x => x.length > 0)
        .filter(x => !x.match(/^\s+$/))
        .map(w => this.lingvService.trimWord(w));
      
      for(var w = 0; w < fragWords.length-1; w++) {
        if(bigrammsBaseSet.has(fragWords[w]) && fragWords[w+1].toLowerCase().trim().length > 0){
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

    // добавить в итоговый массив
    let counter = 0;
    Object.keys(freqs).forEach((w: string) => {
        if(!this.removeStopWords || this.removeStopWords && !this.stopWords.has(w.split(' ')[1])){
          const wf = new WordFreq();
          wf.id = counter++;
          wf.content = w;
          wf.freq = freqs[w];
          this.wordsFreqs.push(wf);
        }
    });

    this.wordsFreqs = this.wordsFreqs.sort((a,b) => b.freq - a.freq);
  }

  deleteWordFreq(id: number) {
    this.wordsFreqs = this.wordsFreqs.filter(wf => wf.id != id);
  }

  selectAllChBChanged(val: boolean): void {
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
    wf.needWordForms = true;
    wf.useForMatrix = true;
    const dialogRef = this.dialog.open(WordFormsModalComponent, {
      data: wf,
      // maxHeight: '30vw'
    });
  }

  exportWordsFreqs(){
    let fileContent = '';
    this.wordsFreqs.forEach((f: WordFreq) => {
      fileContent += f.content + '\t' + f.freq;
      fileContent += '\r\n';
    });

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'freqs.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  exportTermTextMatrixForWords(){
    let fileContent = '';
    let counter = 0;
    const words = this.wordsFreqs.filter(x => x.useForMatrix === true && x.freq >= this.minFreq);

    fileContent += '\t';
    for(let w = 0; w < words.length; w++){
      fileContent += words[w].content + '\t';
    }
    fileContent += '\r\n';

    for(let f = 0; f < this.fragments.length; f++){
      fileContent += this.fragments[f].content.replace('\t',' ') + '\t'; 
      let fragWords: Array<string> = this.fragments[f].content
        .split(this.toWordsSlitterRegex)
        .filter(x => x.length > 0)
        .map(x => x.toLowerCase());
      
      fragWords = fragWords
        .map(w => this.lingvService.trimWord(w).toLowerCase())
        .filter(w => w.length > 0);
      let fragWordsSet = new Set<string>(fragWords);
      for(let w = 0; w < words.length; w++){
        if(words[w].forms != undefined && words[w].forms.length == 0 && fragWordsSet.has(words[w].content)){
          counter++;
        }
        if(words[w].forms != undefined && words[w].needWordForms === true){
          for(let form = 0; form < words[w].forms.length; form++){
            if(fragWordsSet.has(words[w].forms[form].raw)){
              counter++;
              break;
            }
          }
        }        
        fileContent += counter + '\t';
        counter = 0;
      }
      fileContent += '\r\n';
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'freqs.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  exportTermTextMatrixForBiGramms(){
    let fileContent = '';
    let counter = 0;
    const words = this.wordsFreqs.filter(x => x.useForMatrix === true && x.freq >= this.minFreq);

    const rawWords = [];
    this.biGrammsBaseInput.trim().split(' ').forEach(w => {
      rawWords.push(w.toLowerCase());
    });
    const bigrammsBaseSet = new Set(rawWords);

    fileContent += '\t';
    for(let w = 0; w < words.length; w++){
      fileContent += words[w].content + '\t';
    }
    fileContent += '\r\n';
    
    for(let f = 0; f < this.fragments.length; f++){
      fileContent += this.fragments[f].content.replace('\t',' ') + '\t'; 
      let fragWords: Array<string> = this.fragments[f].content
        .split(this.toWordsSlitterRegex)
        .map(w => this.lingvService.trimWord(w).toLowerCase())
        .filter(x => x.length > 0);
      
      for(let x = 0; x < words.length; x++){
        for(let w = 0; w < fragWords.length - 1 ; w++){
          if((fragWords[w] + ' ' + fragWords[w+1]) == words[x].content)
          counter++;
        }
        fileContent += counter + '\t';
        counter = 0;
      }
      
      fileContent += '\r\n';
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'freqs.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  exportTermTextMatrix(){
    if(this.biGrammsMode === true){
      this.exportTermTextMatrixForBiGramms();
    }
    else{
      this.exportTermTextMatrixForWords();
    }
  }

  useForMatrixChBChanged(wf: WordFreq){
    
  }

  wordWormsChBChanged(wf: WordFreq){
    if(wf.needWordForms === true){
      this.lingvService.getWordForm(wf.content).subscribe((x: WordForm[]) => {
        if(wf.forms.length === 0){
          x.forEach(f => {
            f.checked = true;
            wf.forms.push(f);
          });
        }
      });
    }
    else{
      wf.forms = [];
    }
  }
}
