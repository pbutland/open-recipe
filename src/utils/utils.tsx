/**
 * Converts a property name into a string suitable for use in a UI label
 * 
 * @param input the property name to convert
 * @returns the label for the property name given
 */
export function toSentenceCase(input: string | undefined): string | undefined {
  if (input === undefined || input.length === 0) {
    return input;
  }

  const newValue = input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  return newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase();
}

/**
 * Takes a string with spaces and converts to camel case using spaces as the word delimeters
 * 
 * @param input the string to convert
 * @returns a camel case version of the input string
 */
export function toCamelCase(input: string): string {
  const words = input.trim().split(' ');

  const camelCasedWords = words.map((word, index) =>
    index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return camelCasedWords.join('');
}

/**
 * Converts an OpenAPI reference string '$ref' (e.g. #/components/schemas/Ingredient) into an Entity name (e.g. Ingredient)
 * 
 * @param input the reference string to convert
 * @returns the Entity for the given reference string
 */
export function getEntityFromRef(input: string): string {
  const lastIndex = input.lastIndexOf('/');

  if (lastIndex === -1) {
    return input;
  }

  return input.substring(lastIndex + 1);
}

/**
 * Converts an pascal Entity name to a camelCase property name
 * 
 * @param input the Entity string to convert
 * @returns the camelCase property name for the given Entity
 */
export function entityNameToPropertyName(input: string): string {
  if (input.length === 0) {
    return input;
  }

  const firstChar = input.charAt(0).toLowerCase();
  const restOfString = input.slice(1);
  return firstChar + restOfString;
}

/**
 * Converts a property name into a pascal Entity name (e.g. ingredientsGroup to IngredientsGroup)
 * 
 * @param input the property name to convert
 * @returns the Entity for the given property name
 */
export function propertyNameToEntityName(input: string): string {
  if (input.length === 0) {
    return input; // Return the original string if it's empty
  }

  const firstChar = input.charAt(0).toUpperCase();
  const restOfString = input.slice(1);
  return firstChar + restOfString;
}
