import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RawText } from 'src/app/Entities/RawText';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textsSource = new BehaviorSubject(new Array<RawText>());
  currentTextsArray: Observable<Array<RawText>> = this.textsSource.asObservable();

constructor() { }

  updateAllTextsArray(arr: Array<RawText>) {
    return this.textsSource.next(arr);
  }
}
