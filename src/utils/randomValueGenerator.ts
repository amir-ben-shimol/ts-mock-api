import { MockOptions } from "../types/mockOptions";
import { faker } from "@faker-js/faker";

export const generateRandomValue = (type: string, options: MockOptions = {}): any => {
  const parsedType = type.includes("[]") ? "array" : type;

  switch (parsedType) {
    case "string":
      return faker.lorem.words(options.stringLength || 5);
    case "number":
      return faker.number.int();
    case "boolean":
      return faker.datatype.boolean();
    case "array":
      return Array.from({ length: options.arrayLength || 3 }, () =>
        generateRandomValue(type.replace("[]", ""), options)
      );
    default:
      return {}; // For objects, we'll handle this differently
  }
};
