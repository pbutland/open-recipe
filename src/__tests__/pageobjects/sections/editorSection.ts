import { WebDriver, By } from 'selenium-webdriver';
import { BaseSection } from './baseSection';
import { toSentenceCase } from '../../../utils/utils';
import { fetchAndParseYaml } from '../../loader/recipeLoader';
import { getEntityFromRef } from '../../../utils/utils';
import { OpenApiEnum } from '../../../types/openapi';
import Ingredient from '../../../types/Ingredient';
import Recipe from '../../../types/Recipe';

export class EditorSection extends BaseSection {

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async loadRecipe(recipe: Recipe): Promise<void> {

    const yaml = await fetchAndParseYaml('open-recipe.yaml');

    const schemas = yaml.components.schemas
    await this.loadGeneralInfo(recipe, schemas);
    await this.loadIngredients(recipe, schemas);
    await this.loadInstructions(recipe);
    await this.loadNotes(recipe);
    await this.loadNutritionalInfo(recipe);
  }

  private async defaultFormFiller(key: string, fieldId: string, value: string, type: string, recipeProperties: any, schemas: any) {
    if (type === 'string' || type === 'integer' || type === 'number') {
      await this.setFieldValue(fieldId, value);
    } else if (type === undefined) {
      const objName = getEntityFromRef(recipeProperties[key]['$ref']);
      const obj = schemas[objName];
      const typedObj = obj as OpenApiEnum;
      if (typedObj.enum) {
        await this.setSelect(fieldId, toSentenceCase(value) ?? '');
      }
    }
  }

  public async loadGeneralInfo(recipe: Recipe, schemas: any) {
    const generalInfoKeys = ['name', 'description', 'imageUrls', 'creator', 'license', 'source', 'sourceUrl', 'datePublished', 'dateModified', 'servings', 'complexity', 'type', 'cuisine', 'duration', 'tags'];

    const recipeProperties = schemas['Recipe'].properties;
    for (let key in recipeProperties) {
      if (generalInfoKeys.includes(key)) {
        const type = recipeProperties[key].type;
        if (key === 'imageUrls') {
          const images = recipe[key] ?? [];
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            await this.addImage(i, image);
          }
        } else if (key === 'datePublished' || key === 'dateModified') {
          const dateString = recipe[key]?.split('T')[0]?.split("-").reverse().join();
          if (dateString) {
            await this.setFieldValue(`recipe-${key}`, dateString);
          }
        } else if (key === 'duration') {
          const durations = recipe[key] ?? [];
          for (let i = 0; i < durations.length; i++) {
            const duration = durations[i];
            await this.addDuration(i, toSentenceCase(duration.durationType) ?? '', duration.timeInMinutes);
        }
        } else if (key === 'tags') {
          const tags = recipe[key] ?? [];
          for (let i = 0; i < tags.length; i++) {
            const tag = toSentenceCase(tags[i]);
            if (tag) {
              await this.addTag((tag));
            }
          }
        } else {
          await this.defaultFormFiller(key, `recipe-${key}`, recipe[key], type, recipeProperties, schemas);
        }
      }
    }
  }

  public async loadIngredients(recipe: Recipe, schemas: any) {
    const ingredientsGroups = recipe['ingredientsGroups'] ?? [];
    for (let ig = 0; ig < ingredientsGroups.length; ig++) {
      await this.addIngredientGroup(ig, ingredientsGroups[ig].title);
      const ingredients = ingredientsGroups[ig].ingredients;
      for (let i = 0; i < ingredients.length; i++) {

        const ingredient = ingredients[i];
        await this.addIngredient(ig, i, ingredient, schemas);

        let element = await this.findElement(By.id('preview-recipe-shopping-list-title'));
        await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", element);
      }
    }
  }

  public async loadNotes(recipe: Recipe) {
    const notes = recipe['notes'] ?? [];
    for (let i = 0; i < notes.length; i++) {
      await this.addNote(i+1, notes[i].text);

      let element = await this.findElement(By.id('preview-recipe-shopping-list-title'));
      await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", element);
    }
  }

  public async loadInstructions(recipe: Recipe) {
    const instructions = recipe['instructions'] ?? [];
    for (let i = 0; i < instructions.length; i++) {
      await this.addInstruction(instructions[i].step, instructions[i].text);

      let element = await this.findElement(By.id('preview-recipe-shopping-list-title'));
      await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", element);
    }
  }

  public async loadNutritionalInfo(recipe: Recipe) {
    const nutritionInfo = recipe['nutritionInfoPerServe'] ?? [];
    for (let i = 0; i < nutritionInfo.length; i++) {
      const info = nutritionInfo[i];
      const valueType = toSentenceCase(info.valueType);
      const valueUnit = toSentenceCase(info.valueUnit);
      if (valueType) {
        await this.addNutrionalInfo(i, valueType, valueUnit, info.value, info.percent);
      }

      let element = await this.findElement(By.id('preview-recipe-shopping-list-title'));
      await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", element);
    }
  }

  public async addImage(index: number, url: string): Promise<void> {
    await this.clickButton('recipe-add-image');
    await this.setFieldValue(`recipe-imageUrl-${index}`, url);
  }

  public async addDuration(index: number, type: string, duration: number): Promise<void> {
    await this.clickButton('recipe-add-duration'); 

    await this.setSelect(`recipe-durationType-${index}`, type);
    await this.setFieldValue(`recipe-timeInMinutes-${index}`, duration.toString());
  }

  public async addTag(type: string): Promise<void> {
    await this.setSelect(`tags-name`, type);
    await this.clickButton('recipe-add-tag'); 
  }

  public async addIngredientGroup(index?: number, title?: string): Promise<void> {
    await this.clickButton('recipe-add-ingredientGroup');    

    if (index !== undefined && title?.length) {
      await this.setFieldValue(`recipe-indredientGroup-title-${index}`, title);
    }
  }

  public async addIngredient(groupIndex: number, index: number, ingredient: Ingredient, schemas: any): Promise<void> {
    await this.clickButton(`recipe-add-ingredient-${groupIndex}`); 

    const ingredientProperties = schemas['Ingredient'].properties;
    for (let key in ingredientProperties) {
      const value = ingredient[key];
      if (value === undefined) {
        continue;
      }
      const type = ingredientProperties[key].type;
      if (key === 'product') {
        const productProperties = schemas['Product'].properties;
        for (let key in productProperties) {
          const value = ingredient.product[key];
          if (value === undefined) {
            continue;
          }
          const type = productProperties[key].type;
          await this.defaultFormFiller(key, `recipe-ingredient-${key}-${groupIndex}-${index}`, value, type, productProperties, schemas);
        }
      } else {
        await this.defaultFormFiller(key, `recipe-ingredient-${key}-${groupIndex}-${index}`, value, type, ingredientProperties, schemas);
      }
    }
  }

  public async addInstruction(step: number, text: string): Promise<void> {
    await this.clickButton('recipe-add-instruction'); 

    await this.setFieldValue(`recipe-instruction-step-${step-1}`, step.toString());
    await this.setFieldValue(`recipe-instruction-text-${step-1}`, text);
  }

  public async addNote(index: number, text: string): Promise<void> {
    await this.clickButton('recipe-add-note'); 

    await this.setFieldValue(`recipe-note-index-${index-1}`, index.toString());
    await this.setFieldValue(`recipe-note-text-${index-1}`, text);
  }

  public async addNutrionalInfo(index: number, valueType: string, valueUnit?: string, value?: number, percent?: number): Promise<void> {
    await this.clickButton('recipe-add-nutritionInfo');

    await this.setSelect(`recipe-nutritionInfo-valueType-${index}`, valueType);
    if (valueUnit) {
      await this.setSelect(`recipe-nutritionInfo-valueUnit-${index}`, valueUnit);
    }
    if (value) {
      await this.setFieldValue(`recipe-nutritionInfo-value-${index}`, value.toString());
    }
    if (percent) {
      await this.setFieldValue(`recipe-nutritionInfo-percent-${index}`, percent.toString());
    }
  }
}