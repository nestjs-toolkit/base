import { Moment } from 'moment';
import 'moment-timezone';
import * as moment from 'moment';
// import * as moment from 'moment-timezone';

const trans = {
  calendar_same_day: 'today',
  calendar_next_day: 'tomorrow',
  calendar_last_day: 'yesterday',
  calendar_last_week: 'last',
};

class Antl {
  formatMessage(key) {
    return trans[key] || key;
  }
}

export class RequestLocale {
  private lag: string;
  private timeZone: string;
  private offset: string;

  get antl(): Antl {
    return new Antl();
  }

  getMoment(date: any): Moment {
    return moment(date).locale(this.getLang());
  }

  /**
   * language ISO code
   */
  getLangISO(): string {
    return this.getLang().replace('_', '-');
  }

  getLang(): string {
    return this.lag || this.getLangFallback();
  }

  getLangFallback(): string {
    return 'en';
  }

  setLang(lang: string): void {
    if (!lang) return;

    const languages = ['es', 'en', 'pt_br'];
    const str = lang ? lang.toLowerCase().replace('-', '_') : null;

    if (languages.includes(str)) {
      this.lag = str;
    }
  }

  setTimeZone(zone: string): void {
    this.timeZone = zone;
  }

  setTimeZoneOffset(offset: string): void {
    this.offset = offset;
  }

  toMoment(date: any): Moment {
    return this.getMoment(date).utc();
    // if (typeof date === 'string') {
    //   return moment(date).utc();
    // }
    //
    // return moment.isMoment(date) ? date : moment.utc(date);
  }

  toMomentTimezone(date: any): Moment {
    if (this.timeZone) {
      return this.toMoment(date).tz(this.timeZone); // 'America/Sao_Paulo'
    }

    if (this.offset) {
      return this.toMoment(date).utcOffset(this.offset); // '-03:00' || '-180'
    }

    return this.toMoment(date);
  }

  transFromObj(trans: Record<string, string>): string {
    if (!trans) {
      return null;
    }

    return trans[this.getLang()] || trans[this.getLangFallback()];
  }
}
