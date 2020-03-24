import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RawText } from 'src/app/Entities/RawText';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-full-text-modal',
  templateUrl: './FullTextModal.component.html',
  styleUrls: ['./FullTextModal.component.css']
})
export class FullTextModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FullTextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public text: RawText) {}

    closeFullTextModal(): void {
      this.dialogRef.close();
    }
}

