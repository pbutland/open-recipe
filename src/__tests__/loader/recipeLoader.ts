import * as fs from 'fs';
import yaml from 'js-yaml';
import Recipe from "../../recipe/Recipe";

export async function loadRecipe(recipeFile: string): Promise<Recipe> {
  try {
    const fileContent = await fs.promises.readFile(recipeFile, 'utf8');

    return JSON.parse(fileContent) as Recipe;
  } catch (error: any) {
    throw new Error(`Failed to load JSON file: ${error.message}`);
  }
}

export const fetchAndParseYaml = async (file: string): Promise<any> => {
  try {
    const fileContent = await fs.promises.readFile(file, 'utf8');
    return yaml.load(fileContent);
  } catch (error) {
    console.error('Error fetching or parsing YAML:', error);
    throw error;
  }
};
