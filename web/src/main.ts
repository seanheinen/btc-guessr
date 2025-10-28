import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { getAllDataFromLocalForage } from 'ngrx-store-persist';

getAllDataFromLocalForage({
  keys: [
    'btcPrice',
    'user',
  ],
}).then(() => {
  bootstrapApplication(App, appConfig)
}).catch((error) => {
  console.error(error);
});

