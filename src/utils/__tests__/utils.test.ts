import { entityNameToPropertyName, getEntityFromRef, propertyNameToEntityName, toCamelCase, toSentenceCase } from '../utils';

describe('toSentenceCase', () => {
    [
        { input: undefined, expected: undefined },
        { input: '', expected: '' },
        { input: 'hello', expected: 'Hello' },
        { input: 'Hello, World!', expected: 'Hello, world!' },
        { input: '123hello', expected: '123hello' },
        { input: 'ALLCAPS', expected: 'Allcaps' },
        { input: 'lowercase', expected: 'Lowercase' },
        { input: '1234567890', expected: '1234567890' },
        { input: 'camelCase', expected: 'Camel case' }
    ].forEach(testCase => {
        it(`should convert "${testCase.input}" to sentence case as "${testCase.expected}"`, () => {
            expect(toSentenceCase(testCase.input)).toBe(testCase.expected);
        });
    });
});

describe('toCamelCase', () => {
    [
        { input: 'hello world', expected: 'helloWorld' },
        { input: 'this is a test', expected: 'thisIsATest' },
        { input: 'capitalize first letter of each word', expected: 'capitalizeFirstLetterOfEachWord' },
        { input: 'A B C', expected: 'aBC' },
        { input: 'singleword', expected: 'singleword' },
        { input: '   leading and trailing spaces   ', expected: 'leadingAndTrailingSpaces' },
        { input: '', expected: '' },
    ].forEach(({ input, expected }) => {
        it(`should convert '${input}' to the following camel case'${expected}'`, () => {
            expect(toCamelCase(input)).toBe(expected);
        });
    });
});

describe('getEntityFromRef', () => {
    [
        { input: '#/components/schemas/Ingredient', expected: 'Ingredient' },
        { input: '#/components/schemas/Product', expected: 'Product' },
        { input: '#/components/schemas/Unit', expected: 'Unit' },
        { input: 'Unit', expected: 'Unit' },
    ].forEach(({ input, expected }) => {
        it(`should convert reference '${input}' to the following entity '${expected}'`, () => {
            expect(getEntityFromRef(input)).toBe(expected);
        });
    });
});

describe('propertyNameToEntityName', () => {
    [
        { input: 'ingredientsGroup', expected: 'IngredientsGroup' },
        { input: 'note', expected: 'Note' },
        { input: '', expected: '' },
    ].forEach(({ input, expected }) => {
        it(`should convert '${input}' to '${expected}'`, () => {
            expect(propertyNameToEntityName(input)).toBe(expected);
        });
    });
});

describe('entityNameToPropertyName', () => {
    [
        { input: 'IngredientsGroup', expected: 'ingredientsGroup' },
        { input: 'Note', expected: 'note' },
        { input: '', expected: '' },
    ].forEach(({ input, expected }) => {
        it(`should convert '${input}' to '${expected}'`, () => {
            expect(entityNameToPropertyName(input)).toBe(expected);
        });
    });
});
