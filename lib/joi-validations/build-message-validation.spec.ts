import { ValidationError, ValidationErrorItem } from 'joi';
import { buildMessageValidation } from './build-message-validation';
import { JoiMessageValidation } from './types';

class Validation extends Error implements ValidationError {
  name: 'ValidationError';
  _original: any;
  isJoi = true;

  constructor(public details: ValidationErrorItem[]) {
    super();
  }

  annotate(): string {
    return '';
  }
}

describe('func buildMessageValidation', () => {
  const validation = new Validation([
    {
      message: '"name" must be a string',
      path: ['name'],
      type: 'string.base',
      context: { label: 'name', value: 2, key: 'name' },
    },
    {
      message: '"foo.bar" must be a boolean',
      path: ['foo', 'bar'],
      type: 'boolean.base',
      context: { label: 'foo.bar', value: 'yes', key: 'bar' },
    },
  ]);

  it('default messages', () => {
    const result = buildMessageValidation(validation);

    expect(result).toHaveLength(2);

    expect(result[0]).toStrictEqual({
      field: 'name',
      message: 'campo "name" não é do tipo texto',
      validation: 'string.base',
    } as JoiMessageValidation);

    expect(result[1]).toStrictEqual({
      field: 'foo.bar',
      message: 'campo "bar" não é do tipo boleano',
      validation: 'boolean.base',
    } as JoiMessageValidation);
  });

  it('replace attributes messages', () => {
    const attributes = {
      name: 'NOME',
      'foo.bar': 'BAR',
    };

    const result = buildMessageValidation(validation, null, attributes);

    expect(result).toHaveLength(2);

    expect(result[0]).toStrictEqual({
      field: 'name',
      message: 'campo "NOME" não é do tipo texto',
      validation: 'string.base',
    } as JoiMessageValidation);

    expect(result[1]).toStrictEqual({
      field: 'foo.bar',
      message: 'campo "BAR" não é do tipo boleano',
      validation: 'boolean.base',
    } as JoiMessageValidation);
  });

  it('replace messages + attributes', () => {
    const messages = {
      name: { 'string.base': '{label} aaa' },
      'foo.bar': { 'boolean.base': '{label} bbb' },
    };

    const attributes = {
      name: 'NOME',
      'foo.bar': 'BAR',
    };

    const result = buildMessageValidation(validation, messages, attributes);

    expect(result).toHaveLength(2);

    expect(result[0]).toStrictEqual({
      field: 'name',
      message: 'NOME aaa',
      validation: 'string.base',
    } as JoiMessageValidation);

    expect(result[1]).toStrictEqual({
      field: 'foo.bar',
      message: 'BAR bbb',
      validation: 'boolean.base',
    } as JoiMessageValidation);
  });
});
