import { getObject } from '../utils';

const data = {
  pt_br: {
    any: { required: 'campo "{label}" é obrigatório' },
    object: { unknown: 'campo "{label}" não é permitido' },
    string: {
      base: 'campo "{label}" não é do tipo texto',
      min: 'campo "{label}" deve conter pelo menos {limit} caracteres',
      hostname: 'campo "{label}" não é um código valido',
    },
    number: {
      min: 'campo "{label}" deve conter um valor maior ou ingual a {limit}',
      max: 'campo "{label}" deve conter um valor menor ou igual a {limit}',
      hostname: 'campo "{label}" não é um código valido',
    },
    boolean: { base: 'campo "{label}" não é do tipo boleano' },
    objectId: { invalid: 'campo "{label}" não é um UUID valído' },
  },
};

export class Location {
  get(locale: string): Record<string, any> {
    return data[locale] ? data[locale] : data['pt_br'];
  }

  trans(key: string, locale: string, defaultValue = null): string {
    return getObject(this.get(locale), key, defaultValue) || key;
  }
}

export const location = new Location();
