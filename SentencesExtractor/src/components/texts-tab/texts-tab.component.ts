import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RawText } from 'src/app/Entities/RawText';
import { FullTextModalComponent } from '../FullTextModal/FullTextModal.component';
import { DataService } from 'src/services/Data/data.service';

@Component({
  selector: 'app-texts-tab',
  templateUrl: './texts-tab.component.html',
  styleUrls: ['./texts-tab.component.css']
})
export class TextsTabComponent implements OnInit {
  texts: Array<RawText>;

  constructor(public dialog: MatDialog, private dataService: DataService) {
    this.texts = new Array<RawText>();
  }

  ngOnInit() {
  }

  onTextsLoadClicked(): void {
    document.getElementById('upload-texts-input').click();
  }

  onTextsClearClicked(): void {
    this.texts = [];
  }

  upload(files: FileList): void {
    let res: string;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        res = reader.result.toString();
        const text = new RawText(res, file.name);
        this.texts.push(text);

        this.dataService.updateAllTextsArray(this.texts);
      };
      reader.readAsText(file);
    });
  }

  deleteText(id: number): void {
    this.texts = this.texts.filter(t => t.id !== id);
  }

  openFullTextInModal(fullText: RawText): void {
    const dialogRef = this.dialog.open(FullTextModalComponent, {
      maxWidth: '40vw',
      data: fullText
    });
  }
}
