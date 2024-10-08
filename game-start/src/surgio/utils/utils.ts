import { camelCase, kebabCase, snakeCase } from "lodash";

export const pickAndFormatStringList = (
  obj: Record<string, any>,
  keyList: readonly string[],
  options: {
    keyFormat?: "camelCase" | "snakeCase" | "kebabCase";
    stringifyValue?: boolean;
  } = {}
): readonly string[] => {
  const result: string[] = [];
  const { keyFormat, stringifyValue } = options;

  keyList.forEach((key) => {
    if (Object.hasOwn(obj, key)) {
      const propertyKey = keyFormat ? changeCase(key, keyFormat) : key;
      const propertyValue = obj[key];

      if (Array.isArray(propertyValue)) {
        result.push(
          `${propertyKey}=${
            stringifyValue ? JSON.stringify(propertyValue.join(",")) : propertyValue.join(",")
          }`
        );
      } else {
        result.push(
          `${propertyKey}=${stringifyValue ? JSON.stringify(propertyValue) : propertyValue}`
        );
      }
    }
  });

  return result;
};

// istanbul ignore next
export const changeCase = (
  str: string,
  format: "camelCase" | "snakeCase" | "kebabCase"
): string => {
  switch (format) {
    case "camelCase":
      return camelCase(str);
    case "snakeCase":
      return snakeCase(str);
    case "kebabCase":
      return kebabCase(str);
  }
};

export const pickAndFormatKeys = (
  obj: Record<string, any>,
  keyList: readonly string[],
  options: {
    keyFormat?: "camelCase" | "snakeCase" | "kebabCase";
  } = {}
): Record<string, any> => {
  const result: Record<string, any> = {};

  keyList.forEach((key) => {
    if (Object.hasOwn(obj, key)) {
      const propertyKey = options.keyFormat ? changeCase(key, options.keyFormat) : key;
      result[propertyKey] = obj[key];
    }
  });

  return result;
};

export const checkNotNullish = (val: unknown): boolean => val !== null && val !== undefined;

export const getPortFromHost = (host: string): number => {
  const match = host.match(/:(\d+)$/);
  if (match) {
    return Number(match[1]);
  }
  throw new Error(`Invalid host: ${host}`);
};

export const getHostnameFromHost = (host: string): string => {
  const match = host.match(/^(.*?):/);
  if (match) {
    return match[1];
  }
  throw new Error(`Invalid host: ${host}`);
};
