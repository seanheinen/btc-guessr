import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBtcPrice, selectUser } from '../store/selectors';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GuessActions } from '../store/actions';
import { combineLatest, first } from 'rxjs';
import { GuessDirection } from '../../../../shared/models';

@Component({
  selector: 'cx-guessr',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './guessr.html',
  styleUrls: ['./guessr.scss'],
})
export class Guessr {
  readonly store = inject(Store);
  protected readonly btcPrice = inject(Store).selectSignal(selectBtcPrice);

  createHigherGuess() {
    this.createGuess(GuessDirection.higher);
  }

  createLowerGuess() {
    this.createGuess(GuessDirection.lower);
  }

  private createGuess(direction: GuessDirection) {
    combineLatest([this.store.select(selectBtcPrice), this.store.select(selectUser)]).pipe(
      first()
    ).subscribe(([btcPrice, user]) => {
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
