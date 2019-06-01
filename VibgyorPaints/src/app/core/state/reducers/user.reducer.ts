import { User } from '../../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions } from '../user.action';

export interface UserState {
  loggedInUser: User;
}

const initialState: UserState = {
  loggedInUser: null
};

const getUserState = createFeatureSelector<UserState>('user');

export const getLoggedInUser = createSelector(
  getUserState,
  state => state.loggedInUser
);

export function userReducer(state = initialState, action: UserActions ): UserState {
  switch (action.type) {
    case UserActionTypes.SetLoggedInUser:
      return { ...state, loggedInUser: { ...action.payload } };
    case UserActionTypes.ClearLoggedInUser:
      return { ...state, loggedInUser: null };
    default:
      return state;
  }
}
