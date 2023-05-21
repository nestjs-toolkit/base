import format from 'string-format';
import { ValidationError, ValidationErrorItem } from 'joi';
import { getObject } from '../utils';
import { location } from './translate';
import { JoiDataRecord, JoiMessageValidation } from './types';

function resolveMessage(
  item: ValidationErrorItem,
  messages?: JoiDataRecord,
  attributes?: Record<string, string>,
  locale?: string,
): string {
  const key = item.path.join('.');
  const keyShort = item.path[item.path.length - 1];
  const props = {
    ...item.context,
    keyShort,
  };

  props['label'] = props['label'].replace(/^.+\.(.*)$/g, '$1');

  if (attributes && attributes[key]) {
    props['label'] = attributes[key];
  } else if (attributes && attributes[keyShort]) {
    props['label'] = attributes[keyShort];
  }

  let trans = getObject(messages, [key, item.type], null);

  if (!trans) {
    trans = location.trans(item.type, locale, item.message);
  }

  return format(trans, props);
}

export function buildMessageValidationApollo(
  validation: ValidationError,
  messages?: JoiDataRecord,
  attributes?: Record<string, string>,
  locale?: string,
): { validation: JoiMessageValidation[]; exception: null } {
  return {
    exception: null,
    validation: buildMessageValidation(
      validation,
      messages,
      attributes,
      locale,
    ),
  };
}

export function buildMessageValidation(
  validation: ValidationError,
  messages?: JoiDataRecord,
  attributes?: Record<string, string>,
  locale?: string,
): JoiMessageValidation[] {
  if (!validation.isJoi || !validation.details) {
    return [];
  }

  return validation.details.map((d) => {
    return {
      field: d.path.join('.'),
      message: resolveMessage(d, messages, attributes, locale),
      validation: d.type,
    } as JoiMessageValidation;
  });
}
