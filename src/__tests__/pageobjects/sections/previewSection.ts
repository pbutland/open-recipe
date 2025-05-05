import { WebDriver, By } from 'selenium-webdriver';
import { BaseSection } from './baseSection';
import Recipe from '../../../recipe/Recipe';

export class PreviewSection extends BaseSection {

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async getTitle(): Promise<string> {
    const element = await this.findElement(By.id('preview-title'));
    return element.getText();
  }
  public async getPreviewTitle(): Promise<string> {
    const element = await this.findElement(By.id('preview-title'));
    return element.getText();
  }

  public async getName(): Promise<string> {
    return await this.getFieldValue('preview-recipe-name')
  }

  public async getDescription(): Promise<string> {
    return await this.getFieldValue('preview-recipe-description')
  }

  public async validateRecipe(recipe: Recipe): Promise<void> {
    expect(await this.getName()).toBe(recipe.name);
    expect(await this.getDescription()).toBe(recipe.description);

    // TODO validate all other fields
  }
}