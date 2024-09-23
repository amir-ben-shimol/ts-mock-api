import { generateMockData } from '../generators/mock-generator';

type Schema = {
	readonly [key: string]: 'string' | 'number' | 'boolean' | 'string[]' | 'number[]' | 'boolean[]' | Schema;
};

describe('generateMockData', () => {
	it('should generate mock data based on the provided type', () => {
		const schema: Schema = {
			name: 'string',
			age: 'number',
			isActive: 'boolean',
		};

		const mockData = generateMockData(schema) as unknown as {
			name: string;
			age: number;
			isActive: boolean;
		};

		expect(typeof mockData.name).toBe('string');
		expect(typeof mockData.age).toBe('number');
		expect(typeof mockData.isActive).toBe('boolean');
	});

	it("should generate an array of objects with 'names' arrays when arrayLength is provided", () => {
		const schema: Schema = {
			names: 'string[]',
		};

		const mockData = generateMockData(schema, { arrayLength: 5 }) as unknown as Array<{ names: string[] }>;

		expect(Array.isArray(mockData)).toBe(true);
		expect(mockData.length).toBe(5);
		mockData.forEach((item) => {
			expect(Array.isArray(item.names)).toBe(true);
			expect(item.names.length).toBe(5); // Assuming the array length of individual arrays is also controlled by the options
			expect(typeof item.names[0]).toBe('string');
		});
	});

	it("should generate a single array under the 'names' key", () => {
		const schema: Schema = {
			names: 'string[]',
		};

		const mockData = generateMockData(schema) as unknown as { names: string[] };

		expect(Array.isArray(mockData.names)).toBe(true);
		expect(mockData.names.length).toBeGreaterThan(0); // Ensure it's not empty
		expect(typeof mockData.names[0]).toBe('string');
	});

	it('should generate mock data for nested objects', () => {
		const schema: Schema = {
			name: 'string',
			info: {
				email: 'string',
				isActive: 'boolean',
			},
		};

		const mockData = generateMockData(schema) as unknown as {
			name: string;
			info: {
				email: string;
				isActive: boolean;
			};
		};

		expect(typeof mockData.name).toBe('string');
		expect(typeof mockData.info).toBe('object');
		expect(typeof mockData.info.email).toBe('string');
		expect(typeof mockData.info.isActive).toBe('boolean');
	});

	it('should generate an array of objects if arrayLength is provided', () => {
		const schema: Schema = {
			name: 'string',
			age: 'number',
		};

		const mockData = generateMockData(schema, { arrayLength: 3 }) as unknown as Array<{
			name: string;
			age: number;
		}>;

		expect(Array.isArray(mockData)).toBe(true);
		expect(mockData.length).toBe(3);

		mockData.forEach((item) => {
			expect(typeof item.name).toBe('string');
			expect(typeof item.age).toBe('number');
		});
	});
	it('should apply arrayLength only to the top-level object, not nested objects', () => {
		const schema: Schema = {
			name: 'string',
			role: 'number',
			info: {
				firstName: 'string',
				lastName: 'string',
				isAdmin: 'boolean',
			},
		};

		const mockData = generateMockData(schema, { arrayLength: 5 }) as unknown as Array<{
			name: string;
			role: number;
			info: {
				firstName: string;
				lastName: string;
				isAdmin: boolean;
			};
		}>;

		// Check that the top-level object is an array of 5 items
		expect(Array.isArray(mockData)).toBe(true);
		expect(mockData.length).toBe(5);

		// Check that each item in the array is a single object, not an array
		mockData.forEach((item) => {
			expect(typeof item.name).toBe('string');
			expect(typeof item.role).toBe('number');

			// Check that the nested 'info' object is not an array, but a single object
			expect(typeof item.info).toBe('object');
			expect(typeof item.info.firstName).toBe('string');
			expect(typeof item.info.lastName).toBe('string');
			expect(typeof item.info.isAdmin).toBe('boolean');
		});
	});
});
