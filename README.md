# ts-mock-api

**ts-mock-api** is a TypeScript utility for generating dynamic mock data based on TypeScript types. This package helps developers quickly create mock APIs and test data during development, especially when working with complex TypeScript interfaces.

## Features

- **TypeScript-first**: Designed to work seamlessly with TypeScript types and interfaces.
- **Dynamic Data Generation**: Automatically generates mock data based on your TypeScript schema.
- **Customizable**: Allows customization of string lengths, array sizes, and more.
- **Supports Basic and Complex Types**: Handles strings, numbers, booleans, arrays, and nested objects.

## Installation

To install the package, use the following command:

```bash
pnpm add ts-mock-api
```

## Usage

### Basic Example

To get started, define your TypeScript interfaces and a corresponding schema that describes the data types:

```typescript
import { generateMockData } from "ts-mock-api";

interface User {
  name: string;
  age: number;
  isActive: boolean;
}

const userSchema = {
  name: "string",
  age: "number",
  isActive: "boolean",
};

const mockUser = generateMockData(userSchema);

console.log(mockUser);
// Output might be: { name: 'random string', age: 25, isActive: true }
```

### Generating Arrays

You can easily generate arrays of mock data by specifying the type as an array in the schema:

```typescript
const schema = {
  names: "string[]",
};

const mockData = generateMockData(schema, { arrayLength: 5 });

console.log(mockData);
// Output might be: { names: ['random string', 'another string', ...] }
```

### Customizing Mock Data

You can customize the mock data generation by passing an options object:

```typescript
const options = {
  stringLength: 10, // Custom length for strings
  arrayLength: 5, // Number of elements in arrays
};

const mockUser = generateMockData(userSchema, options);

console.log(mockUser);
// Output might be: { name: 'long random string', age: 42, isActive: false }
```

### Handling Nested Objects

The package also supports nested objects. Define the schema for the nested object as well:

```typescript
interface UserProfile {
  name: string;
  age: number;
  contact: {
    email: string;
    phone: string;
  };
}

const profileSchema = {
  name: "string",
  age: "number",
  contact: {
    email: "string",
    phone: "string",
  },
};

const mockProfile = generateMockData(profileSchema);

console.log(mockProfile);
// Output might be: { name: 'John Doe', age: 30, contact: { email: 'john.doe@example.com', phone: '123-456-7890' } }
```

## API

### `generateMockData<T>(typeSchema: T, options?: MockOptions): T`

Generates mock data based on the provided TypeScript schema.

- **`typeSchema`**: An object representing the schema of the data to generate. The keys should match the structure of the desired output, and the values should be string representations of the types (`'string'`, `'number'`, `'boolean'`, `'string[]'`, etc.).
- **`options`** (optional): An object that allows you to customize the generated data.
  - `stringLength`: Specifies the length of generated strings.
  - `arrayLength`: Specifies the number of elements in generated arrays.

### MockOptions

An interface to customize mock data generation:

```typescript
interface MockOptions {
  stringLength?: number; // Default: 5
  arrayLength?: number; // Default: 3
}
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the developers behind the tools and libraries used in this package, such as TypeScript and Faker.js.
