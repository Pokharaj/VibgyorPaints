import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum UserActionTypes {
  SetLoggedInUser = 'Set Logged In User',
  ClearLoggedInUser = 'Clear Logged In User'
}

export class SetLoggedInUser implements Action {
  readonly type = UserActionTypes.SetLoggedInUser;

  constructor(public payload: User) {}
}

export class ClearLoggedInUser implements Action {
  readonly type = UserActionTypes.ClearLoggedInUser;

  constructor() {}
}

export type UserActions = SetLoggedInUser | ClearLoggedInUser;
