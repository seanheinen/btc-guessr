import { createEffect } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { BtcActions } from '../actions';

type AveragePrice = {
  e: 'avgPrice';
  E: 1761567353023;
  s: 'BTCUSDT';
  i: '5m';
  w: '115274.63510946';
  T: 1761567352514;
};

export class BtcEffect {
  ticker$ = createEffect(() => {
    return webSocket<AveragePrice>('wss://stream.binance.com:9443/ws/btcusdt@avgPrice')
      .asObservable()
      .pipe(
        map((averagePrice) =>
          BtcActions.addBTCPrice({
            price: +parseFloat(averagePrice.w).toFixed(2),
            timestamp: averagePrice.E,
          })
        ),
        catchError(() => EMPTY)
      );
  });
}
