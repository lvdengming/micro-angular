import { enableProdMode, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import {
  getSingleSpaExtraProviders,
  singleSpaAngular,
} from 'single-spa-angular';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { config } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (config.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);

    return bootstrapApplication(AppComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        ...(appConfig.providers || []),
      ],
    });
  },
  template: '<angular-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
