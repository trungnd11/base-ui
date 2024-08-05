export const toNumber = (data: string | null) => Number(data);

export const isJSON = (value: string) => {
  if (typeof value !== "string") { value = JSON.stringify(value); }
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const parserJson = (value: string) =>
  JSON.parse(value);

export const cutString = (value?: string | undefined, length?: number) =>
  value ? (value.length > 100 ? `${value?.slice(0, length ?? 100)}...` : value) : "";

export const trimValue: any = (value: unknown) => typeof value === "string" ? value?.trim() : value;

export const trimStartValue: any = (value: unknown) => typeof value === "string" ? value?.trimStart() : value;

export const trimEndValue: any = (value: unknown) => typeof value === "string" ? value?.trimEnd() : value;
