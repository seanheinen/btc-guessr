import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { BtcPrice, User, Guess } from '@shared/models';
import { BtcEffect } from './effects';
import { btcReducer } from './reducers';
import { userReducer } from './reducers/user-reducer';
import { storageSyncMetaReducer } from 'ngrx-store-persist';
import { guessReducer } from './reducers/guess-reducer';

export interface AppState {
  btcPrice: BtcPrice;
  user: User;
  guess: Guess | null;
}

export const storeProvider = provideStore<AppState>(
  {
    btcPrice: btcReducer,
    user: userReducer,
    guess: guessReducer,
  },
  {
    metaReducers: [storageSyncMetaReducer],
  }
);

export const effectsProvider = provideEffects([BtcEffect]);
