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

  constructor(private lingvService: LingvService, public dialogRef: MatDialogRef<WordFormsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public wf: WordFreq) { }

  ngOnInit() {
    if(!this.wf.forms){
      this.wf.forms = new Array<WordForm>();
    }
    this.lingvService.getWordForm(this.wf.content).subscribe((x: WordForm[]) => {
      if(this.wf.forms.length === 0){
        x.forEach(f => {
          f.checked = true;
          this.wf.forms.push(f);
        });
      }
    });
  }

  onCancelClick(): void {
    this.wf.useForMatrix = false;
    this.wf.needWordForms = false;
    this.dialogRef.close();
  }

  onOklicked(): void {
    this.dialogRef.close();
  }
}
