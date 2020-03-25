import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RawText } from 'src/app/Entities/RawText';
import { Fragment } from 'src/app/Entities/Fragment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textsSource = new BehaviorSubject(new Array<RawText>());
  private fragmentsSource = new BehaviorSubject(new Array<Fragment>());
  currentTextsArray: Observable<Array<RawText>> = this.textsSource.asObservable();
  currentFragmentsArray: Observable<Array<Fragment>> = this.fragmentsSource.asObservable();

constructor() { }

  updateAllTextsArray(arr: Array<RawText>) {
    return this.textsSource.next(arr);
  }

  updateAllFragmentsArray(arr: Array<Fragment>) {
    return this.fragmentsSource.next(arr);
  }
}
