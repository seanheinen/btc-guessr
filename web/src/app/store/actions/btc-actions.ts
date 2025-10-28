import { createActionGroup, props } from '@ngrx/store';

export const BtcActions = createActionGroup({
  source: 'btc',
  events: {
    'Add BTC Price': props<{ price: number, timestamp: number }>(),
  },
});