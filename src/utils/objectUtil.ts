export const isObject = (obj: any) => obj === Object(obj);

export const isEmptyObject = (inputObject: Record<string, unknown>) => {
  return Object.keys(inputObject).length === 0;
};
