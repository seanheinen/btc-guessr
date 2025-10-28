import { createFeatureSelector } from '@ngrx/store';
import { Guess } from '../../../../../shared/models';

export const selectGuess = createFeatureSelector<Readonly<Guess>>('guess');