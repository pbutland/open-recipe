import { WebDriver, By } from 'selenium-webdriver';
import { BaseSection } from './baseSection';
import Recipe from '../../../recipe/Recipe';

export class FileSection extends BaseSection {

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async getTitle(): Promise<string> {
    const element = await this.findElement(By.id('file-title'));
    return element.getText();
  }

  public async validateRecipe(recipe: Recipe): Promise<void> {
    // TODO validate generated file contents
  }
}