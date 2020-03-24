import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LingvService {
  api = environment.lingvApiUrl;

constructor(private http: HttpClient) { }

  getWordForm(word: string) {
    return this.http.get(this.api + 'getWordForms?wordForm=' + word);
  }

}


