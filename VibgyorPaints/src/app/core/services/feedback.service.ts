import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private db: AngularFireDatabase) { }

  getFeedback() {
   return this.db.object('feedbacks').snapshotChanges();
  }

  saveFeedback(feedback) {
    return this.db.object('feedbacks/' + feedback.id).set(feedback);
  }

}
