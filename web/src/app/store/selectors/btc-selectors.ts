import { createFeatureSelector } from '@ngrx/store';
import { BtcPrice } from '@shared/models/btc-price';

export const selectBtcPrice = createFeatureSelector<Readonly<BtcPrice>>('btcPrice');
  