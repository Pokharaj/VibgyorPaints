import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dbref: AngularFireObject<User>;

  constructor(private db: AngularFireDatabase,
              private cookie: CookieService,
              private http: HttpClient) {
   }
   
  getUsers() {
    return this.http.get(environment.DATA_URL + 'users');
  }

  getUser(id: number) {
    return this.http.get(environment.DATA_URL + 'user/' + id);
  }

  create(user) {
    const body = JSON.stringify(user);
    return this.http.post(environment.DATA_URL + 'user', body, httpOptions);
  }

  login(email: string, password: string) {
    const body = {email, password};
    return this.http.post(environment.DATA_URL + 'login', body, httpOptions);
  }

  update(user) {
    const body = JSON.stringify(user);
    return this.http.put(environment.DATA_URL + 'user/' + user.id, body, httpOptions);
  }

  deleteCache() {
      localStorage.removeItem(this.cookie.get('loggedInUser'));
      this.cookie.delete('loggedInUser');
  }

  setCache(id: string, user: User) {
    this.cookie.set('loggedInUser', id);
    localStorage.setItem(id, JSON.stringify(user));
  }

  getData(key: string) {
    return this.db.object(key).snapshotChanges();
  }
}
