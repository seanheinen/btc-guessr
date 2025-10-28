import { Routes } from '@angular/router';
import { Guessr } from './guessr/guessr';
import { Leaderboard } from './leaderboard/leaderboard';

export const routes: Routes = [
  {
    path: '',
    component: Guessr,
  },
  {
    path: 'leaderboard',
    component: Leaderboard,
  },
];
