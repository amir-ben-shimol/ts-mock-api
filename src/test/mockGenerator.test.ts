import { generateMockData } from "..";

interface Schema {
  [key: string]: "string" | "number" | "boolean" | "string[]" | "number[]" | "boolean[]";
}

describe("generateMockData", () => {
  it("should generate mock data based on the provided type", () => {
    const schema: Schema = {
      name: "string",
      age: "number",
      isActive: "boolean",
    };

    const mockData = generateMockData(schema);
    expect(typeof mockData.name).toBe("string");
    expect(typeof mockData.age).toBe("number");
    expect(typeof mockData.isActive).toBe("boolean");
  });

  it("should generate arrays if the type is an array", () => {
    const schema: Schema = {
      names: "string[]",
    };

    const mockData = generateMockData(schema, { arrayLength: 5 });

    expect(Array.isArray(mockData.names)).toBe(true);
    expect(mockData.names.length).toBe(5);
  });
});
