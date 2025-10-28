import { createReducer, on } from '@ngrx/store';

import { Guess } from '@shared/models/guess';
import { GuessActions } from '../actions/guess-actions';

export const initialState: Readonly<Guess | null> = null as Guess | null;

export const guessReducer = createReducer(
  initialState,
  on(GuessActions['cx/create'], (_state, { btcPrice, timestamp, username, direction }) => ({ btcPrice, timestamp, username, direction })),
  on(GuessActions['cx/clear'], () => null)
);
