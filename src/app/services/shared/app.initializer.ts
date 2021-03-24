import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdentityService } from '../auth/identity.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import {TranslateService} from './translate.service';

@Injectable()
export class AppInitializerProvider {
  loaded: boolean;
  profileLoaded: boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    public readonly swUpdate: SwUpdate
  ) {
    this.loaded = false;
    this.profileLoaded = false;
    this.bind();
  }

  bind(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    interval(1000 * 60 * 10).subscribe(() => {
      if (this.swUpdate.isEnabled) {
        this.swUpdate
          .checkForUpdate()
          .then(() => console.log('checking for updates...'));
      }
    });
    this.swUpdate.available.subscribe(async (event) => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      console.log('The app is updating right now');
      await this.swUpdate.activateUpdate();
      setTimeout(() => document.location.reload(), 1000);
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA Application');
      this.identityService.install();
    }
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA Application installed');
      this.identityService.install();
    });
  }

  async load(): Promise<void> {
    const promise1 = this.identityService.loadProfile();
    const promise2 = this.translateService.load();
    return Promise.all([promise1, promise2]).then(() => {
      // TODO: do more stuff if required
      return Promise.resolve();
    });
  }
}

export function AppInitializerFactory(provider: AppInitializerProvider): any {
  return () => {
    console.log('initialize app....');
    provider.load().then(() => {
      provider.loaded = true;
      const loader = document.getElementById('app-loading-container');
      document.body.removeChild(loader);
    });
  };
}
