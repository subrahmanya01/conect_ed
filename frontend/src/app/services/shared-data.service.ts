import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  showHeader: any = new BehaviorSubject<boolean>(true);
  showHeader$ = this.showHeader.asObservable();

  constructor() { }

  displayHeader(show: boolean) {
    this.showHeader.next(show);
  }
}
