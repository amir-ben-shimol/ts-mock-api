/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import type { MockOptions } from '@/types/mock-options';

export const generateRandomValue = (type: string, options: MockOptions = {}): any => {
	if (type.endsWith('[]')) {
		const elementType = type.slice(0, -2);

		return Array.from({ length: options.arrayLength || 3 }, () => generateRandomValue(elementType, options));
	}

	switch (type) {
		case 'string': {
			return faker.lorem.word();
		}
		case 'number': {
			return faker.number.int();
		}
		case 'boolean': {
			return faker.datatype.boolean();
		}
		default: {
			return null;
		}
	}
};
