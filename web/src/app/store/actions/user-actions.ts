import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    'cx/user/update-username': props<{ username: string }>(),
    'cx/user/reset-score': emptyProps(),
    'cx/user/increment-score': emptyProps(),
    'cx/user/decrement-score': emptyProps(),
  },
});