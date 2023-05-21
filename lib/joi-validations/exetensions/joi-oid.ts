import Joi from 'joi';
import { ObjectId } from 'bson';

export const JoiObjectId = Joi.extend({
  type: 'objectId',
  messages: {
    'objectId.invalid': 'Código ID inválido!',
  },
  validate(value, { error }) {
    if (!ObjectId.isValid(value)) {
      return { value, errors: error('objectId.invalid') };
    }
  },
}).objectId();
