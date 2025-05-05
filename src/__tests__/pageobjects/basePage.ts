import { WebDriver, By, until } from 'selenium-webdriver';

export class BasePage {
  protected driver: WebDriver;

  private baseUrl: string = 'http://localhost:3000';

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async navigateTo(path: string): Promise<void> {
    await this.driver.get(`${this.baseUrl}/${path}`);
  }

  async waitForElement(locator: By, timeout: number = 10000): Promise<void> {
    await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async findElement(locator: By) {
    await this.waitForElement(locator);
    return await this.driver.findElement(locator);
  }

  async getTitle(): Promise<string> {
    return await this.driver.getTitle();
  }
}