import Joi from 'joi';
import { ObjectID } from 'bson';

export const JoiObjectId = Joi.extend({
  type: 'objectId',
  messages: {
    'objectId.invalid': 'Código ID invalído!',
  },
  validate(value, { error }) {
    if (!ObjectID.isValid(value)) {
      return { value, errors: error('objectId.invalid') };
    }
  },
}).objectId();
