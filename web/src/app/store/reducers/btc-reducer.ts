import { createReducer, on } from '@ngrx/store';

import { BtcActions } from '../actions/btc-actions';
import { BtcPrice } from '@shared/models/btc-price';
  
export const initialState: Readonly<BtcPrice | null> = {
  price: 0,
  timestamp: 0,
};

export const btcReducer = createReducer(
  initialState,
  on(BtcActions.addBTCPrice, (_state, price) => price)
);
