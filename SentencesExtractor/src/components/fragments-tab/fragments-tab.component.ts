/// <reference lib="es2018.regexp" />

import { Component, OnInit } from '@angular/core';
import { LingvService } from 'src/services/Lingv/Lingv.service';
import { WordForm } from 'src/app/Entities/WordForm';
import { DataService } from 'src/services/Data/data.service';
import { RawText } from 'src/app/Entities/RawText';
import { Fragment } from 'src/app/Entities/Fragment';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-fragments-tab',
  templateUrl: './fragments-tab.component.html',
  styleUrls: ['./fragments-tab.component.css']
})
export class FragmentsTabComponent implements OnInit {
  words: string[];
  wordsInput: string;
  fragments: Array<Fragment>;
  selectedLanguage: string;
  selectedFragmentLength: string;
  texts: Array<RawText>;
  sentencesSplittersRegex: RegExp;
  toWordsSlitterRegex: RegExp;
  maxFragmentsToShow: string;
  maxFragmentsToShowAsInt: number;
  loadingMode: boolean;
  spinnerColor: ThemePalette;
  spinnerMode: ProgressSpinnerMode;
  spinnerValue: number;

  constructor(private lingvService: LingvService, private dataService: DataService) {
    this.texts = new Array<RawText>();
    this.words = [];
    this.fragments = new Array<Fragment>();
    this.wordsInput = '';
    this.selectedLanguage = '1';
    this.selectedFragmentLength = '1';
    this.maxFragmentsToShow = '500';
    this.maxFragmentsToShowAsInt = 500;
    this.sentencesSplittersRegex = new RegExp('[.!?]');
    this.toWordsSlitterRegex = /[\s\r\n\t,:;\"'“№%*\()\[\]\/\\”$@^&{}<>~`_]/;
    this.loadingMode = false;
    this.spinnerColor = 'primary'
    this.spinnerMode = 'indeterminate';
    this.spinnerValue = 50;
  }

  ngOnInit() {
    this.dataService.currentTextsArray.subscribe(aa => { this.texts = this.cleanTexts(aa); this.fragments = []; });
  }

  clearWordsInput(): void {
    this.words = [];
    this.wordsInput = '';
  }

  setWordForms(): void {
    this.clearWordsFromBadSymbols();
    if (this.wordsInput.length === 0) {
      return;
    }
    const rawWords = [];
    this.wordsInput.trim().split(' ').forEach(w => {
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
          this.wordsInput = this.words.join(' ');
        });
      });
    });
  }

  clearWordsFromBadSymbols(): void {
    let res = '';
    Array.from(this.wordsInput).forEach(ch => {
      if (ch.match(/[a-zA-Zа-яА-Я0-9\s]/i)) {
        res += ch;
      }
    });
    this.wordsInput = res;
  }

  findFragments(): void {
    if(this.wordsInput.trim().length == 0){
      return;
    }
    // this.loadingMode = true;
    let counter = 0;
    let frId = 0;
    const rawWords = [];
    this.fragments = [];
    this.wordsInput.trim().split(' ').forEach(w => {
      rawWords.push(w.toLowerCase());
    });
    const wordsSet = new Set(rawWords);
    const emptyRegex = new RegExp('^\s+$');
    // разбить тексты на фрагменты по предложениям - ПОТОМ СДЕЛАТЬ ДРУГИЕ ВАРИАНТЫ РАЗБИЕНИЯ
    this.texts.forEach((te: RawText) => {
      let frags: string[] = this.tokenizeTextToFragments(te.content);
      frags = frags.filter(f => !f.match(emptyRegex) && f.length > 0);
      frags.forEach(f => {
        let fragWords: Array<string> = f.split(this.toWordsSlitterRegex).filter(x => x.length > 0);
        fragWords = fragWords
          .filter(w => w !== undefined && w.length > 0)
          .map(w => this.lingvService.trimWord(w));
        let match = false;
        for (let i = 0; i < fragWords.length; i++) {
          if (wordsSet.has(fragWords[i].toLowerCase())) {
            match = true;
            break;
          }
        }

        if (match === true) {
          const fr: Fragment = new Fragment();
          fr.id = ++frId;
          fr.content = f;
          fr.textId = te.id;
          this.fragments.push(fr);
        }
      });
      console.log('looking for fragments is done');
      this.dataService.updateAllFragmentsArray(this.fragments);
      // this.loadingMode = false;
    });
  }

  /*
  trimWord(wordRaw: string): string {
    const regexWordGroupName = 'word';
    let res = '';
    try {
      const matchArray = wordRaw.match(this.wordsTrimmers);
        res = matchArray.groups[regexWordGroupName];
    } catch (err) {
      // console.error(wordRaw);
      // console.error(err);
    }
    return res;
  }
  */

  tokenizeTextToFragments(te: string): Array<string> {
    return te.split(this.sentencesSplittersRegex);
  }

  cleanTexts(texts: Array<RawText> ): Array<RawText> {
    texts.forEach((t:RawText) => {
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
    return texts;
  }

  clearFragments(): void {
    this.fragments = [];
  }

  maxFragmentsToShowChanged(event): void {
    this.maxFragmentsToShowAsInt = Number.parseInt(event.value);
  }

  deleteFragment(id: number): void {
    this.fragments = this.fragments.filter(f => f.id != id)
  }

  exportFragments(){
    let fileContent = '';
    this.fragments.forEach((f: Fragment) => {
      fileContent += '#' + f.id +', textId: ' + f.textId;
      fileContent += '\r\n';
      fileContent += f.content.replace('\r', ' ').replace('\n', ' ').trim();
      fileContent += '\r\n';
      fileContent += '\r\n';
    });

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'fragments.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
