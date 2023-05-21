export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const normalizeHeaders = (
  data?: Record<string, any>,
): Record<string, any> => {
  if (!data) {
    return {};
  }

  return Object.keys(data).reduce((prev, k) => {
    prev[k.toLowerCase()] = data[k];
    return prev;
  }, {});
};

export function getObject(
  obj: Record<string, any>,
  path: string | string[],
  defaultValue: any,
) {
  const pathList: string[] =
    typeof path === 'string' ? path.split('.') : [...path];

  if (!Array.isArray(pathList)) {
    return defaultValue;
  }

  const len = pathList.length;
  for (let i = 0; i < len; i++) {
    if (
      obj &&
      (Object.prototype.hasOwnProperty.call(obj, pathList[i]) ||
        obj[pathList[i]])
    ) {
      obj = obj[pathList[i]];
    } else {
      return defaultValue;
    }
  }

  return obj;
}
