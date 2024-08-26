import { faker } from "@faker-js/faker";
import { MockOptions } from "../types/mockOptions";

export const generateRandomValue = (type: string, options: MockOptions = {}): any => {
  if (type.endsWith("[]")) {
    const elementType = type.slice(0, -2); // Remove "[]" to get the element type (e.g., "string[]" -> "string")
    return Array.from({ length: options.arrayLength || 3 }, () => generateRandomValue(elementType, options));
  }

  switch (type) {
    case "string":
      return faker.lorem.word();
    case "number":
      return faker.number.int();
    case "boolean":
      return faker.datatype.boolean();
    default:
      return null; // Fallback to handle unexpected types
  }
};
