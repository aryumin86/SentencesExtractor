import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordFreq } from 'src/app/Entities/WordFreq';
import { LingvService } from 'src/services/Lingv/Lingv.service';
import { WordForm } from 'src/app/Entities/WordForm';

@Component({
  selector: 'app-word-forms-modal',
  templateUrl: './word-forms-modal.component.html',
  styleUrls: ['./word-forms-modal.component.css']
})
export class WordFormsModalComponent implements OnInit {

  wordForms: Array<WordForm>;

  constructor(private lingvService: LingvService, public dialogRef: MatDialogRef<WordFormsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public wf: WordFreq) { }

  ngOnInit() {
    this.wordForms = new Array<WordForm>();
    this.lingvService.getWordForm(this.wf.content).subscribe((x: WordForm[]) => {
      x.forEach(f => {
        f.checked = true;
        this.wordForms.push(f);
      });
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
