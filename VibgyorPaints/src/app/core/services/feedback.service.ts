import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {}

  getFeedbacks() {
    return this.http.get(environment.DATA_URL + 'feedbacks');
  }

  getFeedback(id: number) {
    return this.http.get(environment.DATA_URL + 'feedback/' + id);
  }

  create(feedback: Feedback) {
    const body = JSON.stringify(feedback);
    return this.http.post(environment.DATA_URL + 'feedback', body, httpOptions);
  }

  update(feedback: Feedback) {
    const body = JSON.stringify(feedback);
    return this.http.put(environment.DATA_URL + 'feedback/' + feedback.id, body, httpOptions);
  }
}
