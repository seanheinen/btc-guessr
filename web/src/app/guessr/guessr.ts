import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBtcPrice, selectUser } from '../store/selectors';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GuessActions, UserActions } from '../store/actions';
import {
  combineLatest,
  filter,
  first,
  interval,
  map,
  of,
  Subscription,
  switchMap,
  timer,
} from 'rxjs';
import { GuessDirection } from '../../../../shared/models';
import { selectGuess } from '../store/selectors/guess-selectors';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const ROUND_DURATION = 5;

@Component({
  selector: 'cx-guessr',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './guessr.html',
  styleUrls: ['./guessr.scss'],
})
export class Guessr implements OnInit, OnDestroy {
  protected readonly ROUND_DURATION = ROUND_DURATION;
  GuessDirection = GuessDirection;
  private snackbar = inject(MatSnackBar );
  readonly store = inject(Store);
  protected readonly btcPrice = inject(Store).selectSignal(selectBtcPrice);
  protected readonly guess = inject(Store).selectSignal(selectGuess);
  protected readonly user = inject(Store).selectSignal(selectUser);

  protected readonly secondsSinceGuess$ = this.store.select(selectGuess).pipe(
    switchMap((guess) =>
      !guess
        ? of(null)
        : timer(0, 1000).pipe(
            map((_) => +new Date()),
            // map((now) => ROUND_DURATION + 1 - (now - (guess?.timestamp ?? 0)) / 1000),
            map((now) => (now - guess.timestamp) / 1000),
            map((timeLeft) => Math.ceil(timeLeft))
          )
    )
  );

  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.secondsSinceGuess$.subscribe((seconds) => {
      if (seconds === null) return;
      const timeLeft = ROUND_DURATION - seconds;
      if (timeLeft === 0) {
        if (
          this.guess()?.direction === GuessDirection.higher &&
          this.btcPrice().price >= this.guess().btcPrice
        ) {
          this.store.dispatch(UserActions['cx/user/increment-score']());
          this.snackbar.open('Correct!', 'Close', { duration: 3000 });
        } else if (
          this.guess()?.direction === GuessDirection.lower &&
          this.btcPrice().price <= this.guess().btcPrice
        ) {
          this.store.dispatch(UserActions['cx/user/increment-score']());
          this.snackbar.open('Correct!', 'Close', { duration: 3000 });
        } else {
          this.store.dispatch(UserActions['cx/user/decrement-score']());
          this.snackbar.open('Incorrect!', 'Close', { duration: 3000 });
        }
        this.store.dispatch(GuessActions['cx/clear']());
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  createHigherGuess() {
    this.createGuess(GuessDirection.higher);
  }

  createLowerGuess() {
    this.createGuess(GuessDirection.lower);
  }

  resetGuess() {
    this.store.dispatch(GuessActions['cx/clear']());
  }

  private createGuess(direction: GuessDirection) {
    combineLatest([this.store.select(selectBtcPrice), this.store.select(selectUser)])
      .pipe(first())
      .subscribe(([btcPrice, user]) => {
        this.store.dispatch(
          GuessActions['cx/create']({
            btcPrice: btcPrice.price,
            timestamp: +new Date(),
            username: user.username,
            direction: direction,
          })
        );
      });
  }
}
