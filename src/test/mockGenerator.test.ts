import { generateMockData } from "..";

interface Schema {
  [key: string]: "string" | "number" | "boolean" | "string[]" | "number[]" | "boolean[]" | Schema;
}

describe("generateMockData", () => {
  it("should generate mock data based on the provided type", () => {
    const schema: Schema = {
      name: "string",
      age: "number",
      isActive: "boolean",
    };

    const mockData = generateMockData(schema) as unknown as {
      name: string;
      age: number;
      isActive: boolean;
    };

    expect(typeof mockData.name).toBe("string");
    expect(typeof mockData.age).toBe("number");
    expect(typeof mockData.isActive).toBe("boolean");
  });

  it("should generate an array of objects with 'names' arrays when arrayLength is provided", () => {
    const schema: Schema = {
      names: "string[]",
    };

    const mockData = generateMockData(schema, { arrayLength: 5 }) as unknown as Array<{ names: string[] }>;

    console.log("Generated mockData.names:", mockData);

    expect(Array.isArray(mockData)).toBe(true);
    expect(mockData.length).toBe(5);
    mockData.forEach((item) => {
      expect(Array.isArray(item.names)).toBe(true);
      expect(item.names.length).toBe(5); // Assuming the array length of individual arrays is also controlled by the options
      expect(typeof item.names[0]).toBe("string");
    });
  });

  it("should generate a single array under the 'names' key", () => {
    const schema: Schema = {
      names: "string[]",
    };

    const mockData = generateMockData(schema) as unknown as { names: string[] };

    console.log("Generated mockData.names:", mockData);

    expect(Array.isArray(mockData.names)).toBe(true);
    expect(mockData.names.length).toBeGreaterThan(0); // Ensure it's not empty
    expect(typeof mockData.names[0]).toBe("string");
  });

  it("should generate mock data for nested objects", () => {
    const schema: Schema = {
      name: "string",
      info: {
        email: "string",
        isActive: "boolean",
      },
    };

    const mockData = generateMockData(schema) as unknown as {
      name: string;
      info: {
        email: string;
        isActive: boolean;
      };
    };

    expect(typeof mockData.name).toBe("string");
    expect(typeof mockData.info).toBe("object");
    expect(typeof mockData.info.email).toBe("string");
    expect(typeof mockData.info.isActive).toBe("boolean");
  });

  it("should generate an array of objects if arrayLength is provided", () => {
    const schema: Schema = {
      name: "string",
      age: "number",
    };

    const mockData = generateMockData(schema, { arrayLength: 3 }) as unknown as Array<{
      name: string;
      age: number;
    }>;

    expect(Array.isArray(mockData)).toBe(true);
    expect(mockData.length).toBe(3);

    mockData.forEach((item) => {
      expect(typeof item.name).toBe("string");
      expect(typeof item.age).toBe("number");
    });
  });
});
