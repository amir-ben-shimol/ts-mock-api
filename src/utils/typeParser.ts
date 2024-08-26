export const parseType = (type: string): string => {
  if (type.includes("[]")) return "array";
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";
  return "object";
};
