import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePopUpService {
  popUpImageURL$ = new Subject();

  constructor() { }

  createNewPopUpImage(url) {
    this.popUpImageURL$.next(url);
  }
}
