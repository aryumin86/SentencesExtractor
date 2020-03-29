import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  emailReplacor = 'Показать email';

  constructor() { }

  ngOnInit() {
  }

  showMyEmail(){
    this.emailReplacor = 'aryumin@aryumin.ru';
  }

}
