import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private db: AngularFireDatabase) {}

  getVisits() {
    return this.db.object('visits').snapshotChanges();
  }

  updateVisit(uid: string, valueChanges: object) {
    return this.db.object('visits/' + uid).update(valueChanges);
  }
  saveNewVisit(valueObj) {
    return this.db.list('visits').push(valueObj);
  }
}
