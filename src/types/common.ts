type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[];

export type TClassName = TClass | TClass[];

export interface IResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TErrors {
  status_code: 400 | 401 | 403 | 500 | 502;
  errors: {
    error: string;
    message: string;
  }[];
}
