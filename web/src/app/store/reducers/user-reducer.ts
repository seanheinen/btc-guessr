import { createReducer, on } from '@ngrx/store';

import { fakerEN as faker} from "@faker-js/faker";
import { User } from '@shared/models/user';
import { UserActions } from '../actions/user-actions';

export const initialState: Readonly<User> = {
  username: faker.word.adjective().toLowerCase() + '-' + faker.person.firstName().toLowerCase(),
  score: 0,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.changeUsername, (_state, { username }) => ({ ..._state, username })),
  on(UserActions.changeScore, (_state, { score }) => ({ ..._state, score }))
);
