import { Component, OnInit } from '@angular/core';
import { LingvService } from 'src/services/Lingv/Lingv.service';
import { WordForm } from 'src/app/Entities/WordForm';

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

  constructor(private lingvService: LingvService) {
    this.biGrammsBaseInput = '';
    this.maxElemsToShow = 500;
    this.maxElemsToShowSelect = '500';
    this.stopWords = new Set();
    this.stopWords = this.lingvService.getRusStopWords();
    this.words = [];
  }

  ngOnInit() {
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

}
