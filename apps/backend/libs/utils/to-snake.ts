import { DeepSnakeCase } from '@libs/types/case';

export const toSnake = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const toSnakeDeep = <T extends object>(obj: T): DeepSnakeCase<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeDeep(v)) as unknown as DeepSnakeCase<T>;
  }

  if (obj instanceof Date) {
    return obj as unknown as DeepSnakeCase<T>;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [toSnake(key)]: toSnakeDeep(value as T),
      }),
      {} as DeepSnakeCase<T>,
    );
  }
  return obj;
};
