import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { BtcPrice } from '@shared/models/btc-price';
import { BtcEffect } from './effects';
import { btcReducer } from './reducers';
import { userReducer } from './reducers/user-reducer';
import { User } from '../../../../shared/models/user';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

export interface AppState {
  btcPrice: BtcPrice;
  user: User;
}

export const storeProvider = provideStore<AppState>(
  {
    btcPrice: btcReducer,
    user: userReducer,
  },
  {
    metaReducers: [storageSyncMetaReducer],
  }
);

export const effectsProvider = provideEffects([BtcEffect]);
