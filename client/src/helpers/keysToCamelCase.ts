const toCamelCase = (str: string) => str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

export const convertKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[toCamelCase(key)] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};
