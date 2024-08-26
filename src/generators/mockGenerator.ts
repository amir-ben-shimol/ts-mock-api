import { parseType } from "../utils/typeParser";
import { generateRandomValue } from "../utils/randomValueGenerator";
import { MockOptions } from "../types/mockOptions";

export const generateMockData = <T extends Record<string, any>>(
  typeSchema: T,
  options: MockOptions = {},
  isTopLevel: boolean = true
): T | T[] => {
  const createMockObject = (): T => {
    const mockData = {} as T;

    for (const key in typeSchema) {
      if (Object.prototype.hasOwnProperty.call(typeSchema, key)) {
        const type = typeSchema[key];

        if (typeof type === "object" && !Array.isArray(type)) {
          mockData[key] = generateMockData(type, options, false) as T[typeof key];
        } else if (typeof type === "string" && type.endsWith("[]")) {
          const elementType = type.slice(0, -2); // e.g., "string[]" -> "string"
          const arrayValue = Array.from({ length: options.arrayLength || 3 }, () =>
            generateRandomValue(elementType, options)
          );
          mockData[key] = arrayValue as unknown as T[typeof key];
        } else {
          mockData[key] = generateRandomValue(type, options) as T[typeof key];
        }
      }
    }
    return mockData;
  };

  if (isTopLevel && options.arrayLength && options.arrayLength > 1) {
    // Apply arrayLength only to the top-level object
    return Array.from({ length: options.arrayLength }, createMockObject);
  }

  return createMockObject();
};
