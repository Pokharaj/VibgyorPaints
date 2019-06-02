import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient) { }

  getvisits() {
    return this.http.get(environment.DATA_URL + 'visits');
  }

  getvisit(id: number) {
    return this.http.get(environment.DATA_URL + 'visit/' + id);
  }

  create(visit) {
    const body = JSON.stringify(visit);
    return this.http.post(environment.DATA_URL + 'visit', body, httpOptions);
  }

  update(visit) {
    const body = JSON.stringify(visit);
    return this.http.put(environment.DATA_URL + 'visit/' + visit.id, body, httpOptions);
  }

  findByUser(id: number) {
    return this.http.get(environment.DATA_URL + 'visit/user/' + id);
  }
}
