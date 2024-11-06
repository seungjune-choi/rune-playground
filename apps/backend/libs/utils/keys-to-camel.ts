import { DeepCamelCase } from '@libs/types/case';

export const toCamel = (str: string) => str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

export const toCamelDeep = <T extends object>(obj: T): DeepCamelCase<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelDeep(v)) as unknown as DeepCamelCase<T>;
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [toCamel(key)]: toCamelDeep(value as T),
      }),
      {} as DeepCamelCase<T>,
    );
  }
  return obj;
};
