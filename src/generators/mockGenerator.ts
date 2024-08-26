import { parseType } from "../utils/typeParser";
import { generateRandomValue } from "../utils/randomValueGenerator";
import { MockOptions } from "../types/mockOptions";

export const generateMockData = <T extends Record<string, any>>(
  typeSchema: T,
  options: MockOptions = {}
): T | T[] => {
  const createMockObject = (): T => {
    const mockData = {} as T;

    for (const key in typeSchema) {
      if (Object.prototype.hasOwnProperty.call(typeSchema, key)) {
        const type = typeSchema[key];

        if (typeof type === "object" && !Array.isArray(type)) {
          mockData[key] = generateMockData(type, options) as T[typeof key];
        } else if (typeof type === "string" && type.endsWith("[]")) {
          const elementType = type.slice(0, -2); // e.g., "string[]" -> "string"
          console.log(`Generating array for key "${key}" with type "${elementType}"`);
          const arrayValue = Array.from({ length: options.arrayLength || 3 }, () =>
            generateRandomValue(elementType, options)
          );
          console.log(`Generated array for key "${key}":`, arrayValue);
          mockData[key] = arrayValue as unknown as T[typeof key]; // Assign the array to the correct key
        } else {
          mockData[key] = generateRandomValue(type, options) as T[typeof key];
        }
      }
    }
    console.log("Final mockData object:", mockData);
    return mockData;
  };

  if (options.arrayLength && options.arrayLength > 1) {
    return Array.from({ length: options.arrayLength }, createMockObject);
  }

  return createMockObject();
};
