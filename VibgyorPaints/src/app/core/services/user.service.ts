import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { USER } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dbref: AngularFireObject<User>;

  constructor(private db: AngularFireDatabase,
              private cookie: CookieService) {
   }

  deleteCache() {
      localStorage.removeItem(this.cookie.get('loggedInUser'));
      this.cookie.delete('loggedInUser');
  }

  setCache(id: string, user: User) {
    this.cookie.set('loggedInUser', id);
    localStorage.setItem(id, JSON.stringify(user));
  }

  createNewUser(res: firebase.auth.UserCredential, user: User): Promise<void> {
    this.dbref = this.db.object<User>('users/' + res.user.uid);

    if (user.type) {
      user.type = USER.B2B;
      user.active = false;
    } else {
      user.type = USER.B2C;
      user.active = true;
    }

    return this.dbref.set({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      location: user.location,
      type: user.type,
      isDeleted: false,
      active: user.active,
      emailid: user.emailid
    });
  }

  getData(key: string) {
    return this.db.object(key).snapshotChanges();
  }

  getUserData(uid: string): Observable<User> {
    return this.db.object<User>('users/' + uid).valueChanges();
  }

  updateUser(uid: string, valueChanges: object) {
    return this.db.object('users/' + uid).update(valueChanges);
  }
}
