import {Component} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AppInitializerProvider} from './services/shared/app.initializer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly device: DeviceDetectorService,
    readonly appInitializerProvider: AppInitializerProvider,
  ) {
    document.body.className = `${document.body.className} ${this.device.os} ${this.device.browser}`.toLowerCase();
  }
}
