import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GuessDirection } from '../../../../../shared/models';

export const GuessActions = createActionGroup({
  source: 'guess',
  events: {
    'cx/create': props<{
      btcPrice: number;
      timestamp: number;
      username: string;
      direction: GuessDirection;
    }>(),
    'cx/clear': emptyProps(),
  },
});
