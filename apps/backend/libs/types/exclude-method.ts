import { AnonymousFunction } from '@libs/types/anonymous-function';

export type ExcludeMethod<T> = {
  [P in keyof T]: T[P] extends AnonymousFunction ? never : P;
};
