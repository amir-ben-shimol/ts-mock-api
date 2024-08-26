import { parseType } from "../utils/typeParser";
import { generateRandomValue } from "../utils/randomValueGenerator";
import { MockOptions } from "../types/mockOptions";

export const generateMockData = <T extends Record<string, any>>(
  typeSchema: T,
  options: MockOptions = {}
): T => {
  const mockData: Partial<T> = {};

  for (const key in typeSchema) {
    if (Object.prototype.hasOwnProperty.call(typeSchema, key)) {
      const type = typeSchema[key];
      const parsedType = parseType(type);
      if (parsedType === "object") {
        mockData[key] = generateMockData(type, options);
      } else {
        mockData[key] = generateRandomValue(type, options);
      }
    }
  }

  return mockData as T;
};
