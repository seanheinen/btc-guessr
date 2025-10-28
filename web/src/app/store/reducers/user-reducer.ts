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
  on(UserActions['cx/user/update-username'], (_state, { username }) => ({ ..._state, username })),
  on(UserActions['cx/user/reset-score'], (_state) => ({ ..._state, score: 0 })),
  on(UserActions['cx/user/increment-score'], (_state) => ({ ..._state, score: _state.score + 1 })),
  on(UserActions['cx/user/decrement-score'], (_state) => ({ ..._state, score: _state.score - 1 }))
);
