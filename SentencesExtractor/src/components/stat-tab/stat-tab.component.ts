import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-tab',
  templateUrl: './stat-tab.component.html',
  styleUrls: ['./stat-tab.component.css']
})
export class StatTabComponent implements OnInit {
  biGrammsBaseInput: string;
  maxElemsToShowSelect: string;
  maxElemsToShow: number;

  constructor() {
    this.biGrammsBaseInput = '';
    this.maxElemsToShow = 500;
    this.maxElemsToShowSelect = '500';
  }

  ngOnInit() {
  }

  maxElemsToShowChanged(event): void {

  }

}
