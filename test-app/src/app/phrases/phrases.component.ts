import { Component, OnInit } from '@angular/core';
import {PHRASES} from '../core/data/input-phrases';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss']
})
export class PhrasesComponent implements OnInit {
  phrasesList = PHRASES.slice();
  currentValue: string;
  currentLanguage: string;

  constructor() {
    this.currentValue = '';
    this.currentLanguage = '';
   }

  ngOnInit(): void {}

  addPhrase(): void {
    if (this.currentValue && this.currentLanguage) {
      this.phrasesList.push({value: this.currentValue, language: this.currentLanguage})
    }
    this.currentValue = '';
    this.currentLanguage = '';
  }

}
