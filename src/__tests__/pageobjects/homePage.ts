import { WebDriver } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { EditorSection } from './sections/editorSection';
import { FileSection } from './sections/fileSection';
import { PreviewSection } from './sections/previewSection';

export class HomePage extends BasePage {

  private editorSection: EditorSection;
  private previewSection: PreviewSection;
  private fileSection: FileSection;

  constructor(driver: WebDriver) {
    super(driver);
    this.editorSection = new EditorSection(driver);
    this.previewSection = new PreviewSection(driver);
    this.fileSection = new FileSection(driver);
  }

  async load(): Promise<void> {
    await super.navigateTo('');
  }

  public getEditorSection(): EditorSection {
    return this.editorSection;
  }ß

  public getPreviewSection(): PreviewSection {
    return this.previewSection;
  }

  public getFileSection(): FileSection {
    return this.fileSection;
  }
}