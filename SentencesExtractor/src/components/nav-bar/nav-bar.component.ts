import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailComponent } from '../sendEmail/sendEmail.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSendEmailModal(): void {
    this.dialog.open(SendEmailComponent, {
      // ...
    });
  }

}
