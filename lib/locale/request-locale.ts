import { Moment } from 'moment';
import moment from 'moment-timezone';

export class RequestLocale {
  private lag = 'en';
  private timeZone = 'UTC';
  private offset: string;

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
    return this.lag;
  }

  setLang(lang: string): void {
    if (!lang) return;

    const languages = ['es', 'en', 'pt', 'pt_br'];
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

    return trans[this.getLang()];
  }

  fromTimezoneToDateUtc(date: Date | string): Date {
    return moment(date).tz(this.timeZone, true).utc().toDate();
  }
}
