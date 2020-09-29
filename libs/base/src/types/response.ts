export interface ValidationType {
  message: string;
  field: string;
  validation: string;
}

export interface ResponseType {
  status?: 'error' | 'success';
  message?: string;
  data?: any;
  validation?: ValidationType[] | null;
  error?: { code: string; httpCode: number };
  exception?: any;
}
