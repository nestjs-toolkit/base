export type JoiDataRecord = Record<string, Record<string, string>>;

export interface JoiMessageValidation {
  message: string;
  field: string;
  validation: string;
}
