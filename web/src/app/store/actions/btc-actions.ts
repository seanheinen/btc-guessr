import { createActionGroup, props } from '@ngrx/store';

export const BtcActions = createActionGroup({
  source: 'btc',
  events: {
    'cx/btc/update': props<{ price: number, timestamp: number }>(),
  },
});