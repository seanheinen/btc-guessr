import { createFeatureSelector } from '@ngrx/store';
import { BtcPrice } from '@models/btc-price';

export const selectBtcPrice = createFeatureSelector<Readonly<BtcPrice>>('btc');
