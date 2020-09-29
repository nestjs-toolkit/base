export const TEM_HELPER = null;

// const crypto = require('crypto');
// const _uuid = require('uuid');
// const { get } = require('lodash');
// const { ObjectID } = require('mongodb');
//
// export function tob_simple_uuid() {
//   return _uuid.v4();
// }
//
// export function tob_uuid() {
//   return crypto
//     .createHash('sha256')
//     .update(_uuid.v4())
//     .digest('hex');
// }
//
// export function tob_makeid(length) {
//   let result = '';
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
//
// export function tob_str_to_number(str: any): number | null {
//   if (str) {
//     return Number(str.toString().replace(/[^\d.-]/g, ''));
//   } else {
//     return null;
//   }
// }
//
// export function tob_str_slug(str: string): string {
//   return str
//     .toString()
//     .toLowerCase()
//     .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a') // Special Characters #1
//     .replace(/[èÈéÉêÊëË]+/g, 'e') // Special Characters #2
//     .replace(/[ìÌíÍîÎïÏ]+/g, 'i') // Special Characters #3
//     .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o') // Special Characters #4
//     .replace(/[ùÙúÚûÛüÜ]+/g, 'u') // Special Characters #5
//     .replace(/[ýÝÿŸ]+/g, 'y') // Special Characters #6
//     .replace(/[ñÑ]+/g, 'n') // Special Characters #7
//     .replace(/[çÇ]+/g, 'c') // Special Characters #8
//     .replace(/[ß]+/g, 'ss') // Special Characters #9
//     .replace(/[Ææ]+/g, 'ae') // Special Characters #10
//     .replace(/[Øøœ]+/g, 'oe') // Special Characters #11
//     .replace(/[%]+/g, 'pct') // Special Characters #12
//     .replace(/\s+/g, '-') // Replace spaces with -
//     .replace(/[^\w\-]+/g, '') // Remove all non-word chars
//     .replace(/\-\-+/g, '-') // Replace multiple - with single -
//     .replace(/^-+/, '') // Trim - from start of text
//     .replace(/-+$/, ''); // Trim - from end of text
// }
//
// export function tob_mongo_id(id: string) {
//   return ObjectID(id);
// }
//
// export function tob_get(data, key, defaultValue = null): any {
//   return get(data, key, defaultValue);
// }
