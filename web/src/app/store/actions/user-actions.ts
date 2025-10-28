import { createActionGroup, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    'Change Username': props<{ username: string }>(),
    'Change Score': props<{ score: number }>(),
  },
});