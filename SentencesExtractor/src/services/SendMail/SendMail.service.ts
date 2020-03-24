import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLetter } from 'src/app/Entities/UserLetter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  private apiAddress = environment.sendMailApiUrl;

  constructor(private http: HttpClient) { }

  public sendEmailService(letter: UserLetter) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.apiAddress + 'SendFeedBack', letter, httpOptions).subscribe(x => {
      console.log(letter);
    });
  }

}


