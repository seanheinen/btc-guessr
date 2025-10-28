import { createActionGroup, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    'cx/user/update-username': props<{ username: string }>(),
    'cx/user/change-score': props<{ score: number }>(),
  },
});