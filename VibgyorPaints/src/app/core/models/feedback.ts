import { User } from './user';

export interface Feedback {
  id: number;
  user: User;
  date: Date;
  comment: string;
}
