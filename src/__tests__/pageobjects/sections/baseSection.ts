import { WebDriver, By, until } from 'selenium-webdriver';

const DEBUGGING_WAIT_PERIOD: number = 0;

export class BaseSection {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  public async getSectionTitle(id: string): Promise<string> {
    const element = await this.findElement(By.id(id));
    return element.getText();
  }

  async waitForElement(locator: By, timeout: number = 10000): Promise<void> {
    await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async findElement(locator: By) {
    await this.waitForElement(locator);
    return await this.driver.findElement(locator);
  }

  protected async getFieldValue(fieldNameId: string): Promise<string> {
    const element = await this.findElement(By.id(fieldNameId));
    return element.getText();
  }

  protected async setFieldValue(fieldNameId: string, value: string): Promise<void> {
    let element = await this.findElement(By.id(fieldNameId));
    await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", element);
    await element.clear();

    if (value.length > 20) {
      const mainValue = value.slice(0, value.length - 1);
      const lastCharacter = value.slice(value.length - 1);
      await this.driver.executeScript('arguments[0].value = arguments[1]', element, mainValue);
      element.sendKeys(lastCharacter);
    } else {
      element.sendKeys(value);
    }
    await this.driver.actions().pause(DEBUGGING_WAIT_PERIOD).perform();
  }

  protected async setSelect(fieldNameId: string, value: string): Promise<void> {
    const selectElement = await this.findElement(By.id(fieldNameId));
    await selectElement.click();

    await this.driver.wait(until.elementLocated(By.css('.MuiMenu-list')), 5000);

    const optionToSelect = await this.findElement(By.xpath(`//li[text()='${value}']`));
    await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", optionToSelect);
    await optionToSelect.click();
    await this.driver.actions().pause(DEBUGGING_WAIT_PERIOD).perform();
  }

  protected async clickButton(buttonId: string): Promise<void> {
    const button = await this.findElement(By.id(buttonId));
    await this.driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", button);
    await button.click();
  }
}