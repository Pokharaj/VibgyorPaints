import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Store } from '../models/store';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  
  constructor(private http: HttpClient) {}

  getStores() {
    return this.http.get(environment.DATA_URL + 'stores');
  }

  getStore(id: number) {
    return this.http.get(environment.DATA_URL + 'store/' + id);
  }

  create(store: Store) {
    const body = JSON.stringify(store);
    return this.http.post(environment.DATA_URL + 'store', body, httpOptions);
  }

  update(store: Store) {
    const body = JSON.stringify(store);
    return this.http.put(environment.DATA_URL + 'store/' + store.id, body, httpOptions);
  }
}
