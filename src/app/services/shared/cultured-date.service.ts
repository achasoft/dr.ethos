import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CulturedDateService {
  constructor() {}

  toString(value: string | Date, time?: boolean, format?: string): string {
    if (!value) {
      return '';
    }
    value = new Date(value);
    format = format || (time ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD');
    return moment(value).locale('en').format(format);
  }
}
