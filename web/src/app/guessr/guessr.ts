import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBtcPrice } from '../store/selectors';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cx-guessr',
  imports: [CommonModule, MatCardModule],
  templateUrl: './guessr.html',
  styleUrls: ['./guessr.scss'],
})
export class Guessr {
  protected readonly btcPrice = inject(Store).selectSignal(selectBtcPrice);
}
