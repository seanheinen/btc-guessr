export enum GuessDirection {
  higher = 'higher',
  lower = 'lower',
}

export interface Guess {
  timestamp: number;
  username: string;
  btcPrice: number;
  direction: GuessDirection;
}
