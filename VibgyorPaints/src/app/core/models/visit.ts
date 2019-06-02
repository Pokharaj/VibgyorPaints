import { User } from './user';

export interface Visit {
  id: number;
  user: User;
  visitDate: Date;
  requestDate: Date;
  description: string;
  comment: string;
  canceled: boolean;
  rejected: boolean;
}
