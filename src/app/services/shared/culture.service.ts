import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CultureService {
  private readonly currentLanguage: string;
  private readonly currentDir: string;

  constructor() {
    this.currentLanguage = environment.lang;
    switch (environment.lang) {
      case 'fa':
      case 'ar':
        this.currentDir = 'rtl';
        break;
      default:
        this.currentDir = 'ltr';
    }

    const html = document.querySelector('html');
    html.lang = this.currentLanguage;
    html.dir = this.currentDir;
  }

  public get lang(): string {
    return this.currentLanguage;
  }

  public get dir(): string {
    return this.currentDir;
  }

  public get rtl(): boolean {
    return this.currentDir === 'rtl';
  }
}
