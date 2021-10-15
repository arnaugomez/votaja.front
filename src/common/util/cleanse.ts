/**
 * Remove undefined properties from object
 * @param obj Any javascript object
 * @returns That same object but without the undefined properties
 */
export function cleanse<T extends object>(obj: T): T {
  const returned: any = {};

  for (const k in obj) {
    const v = obj[k];
    if (v === undefined || v === null) {
      continue;
    }
    returned[k] =
      typeof v === "object" && !Array.isArray(v)
        ? cleanse(v as unknown as object)
        : v;
  }

  return returned as T;
}
