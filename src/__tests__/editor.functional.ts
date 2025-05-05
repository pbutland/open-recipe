import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { HomePage } from './pageobjects/homePage';
import { loadRecipe } from './loader/recipeLoader';

describe('Editor', () => {
  let driver: WebDriver;
  let homePage: HomePage;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,2160');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    homePage = new HomePage(driver);
    await homePage.load();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load page', async () => {
    await homePage.load();

    expect(await homePage.getEditorSection().getSectionTitle('general-info')).toContain('General Info');
    expect(await homePage.getEditorSection().getSectionTitle('ingredient-groups')).toContain('Ingredient Groups');
    expect(await homePage.getEditorSection().getSectionTitle('instructions')).toContain('Instructions');
    expect(await homePage.getEditorSection().getSectionTitle('notes')).toContain('Notes');
    expect(await homePage.getEditorSection().getSectionTitle('nutrition-info')).toContain('Nutritional Info Per Serve');
    expect(await homePage.getPreviewSection().getSectionTitle('preview-tab')).toContain('PREVIEW');
    expect(await homePage.getFileSection().getSectionTitle('file-tab')).toContain('FILE');
  });

  [
    './recipes/lasagne.json',
    './recipes/puttanesca.json'
  ].forEach(recipeFile => {
    it(`should display basic recipe data for ${recipeFile}`, async () => {
      await homePage.load();

      const editorSection = homePage.getEditorSection();
      const previewSection = homePage.getPreviewSection();
      const fileSection = homePage.getFileSection();

      const recipe = await loadRecipe(recipeFile);
      await editorSection.loadRecipe(recipe);

      await previewSection.validateRecipe(recipe);
      await fileSection.validateRecipe(recipe);

    }, 120000);
  });
});