import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  constructor(private db: AngularFireDatabase) {}

  getStores() {
    return this.db.object('stores').snapshotChanges();
  }

  updateStore(uid: string, valueChanges: object) {
    return this.db.object('stores/' + uid).update(valueChanges);
  }
  saveNewStore(cityName: any, valueObj) {
    return this.db.list(`stores/${cityName}`).push(valueObj);
  }
  saveNewCityStore(cityName: any, valueObj) {
    this.db.object(`stores/${cityName}`).set({ 0: valueObj });
  }
}
