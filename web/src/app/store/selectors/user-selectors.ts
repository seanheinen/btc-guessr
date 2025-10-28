import { createFeatureSelector } from '@ngrx/store';
import { User } from '@shared/models/user';

export const selectUser = createFeatureSelector<Readonly<User>>('user');
