import { browser, element, by } from 'protractor';

export class SeeyondPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('seeyond-root h1')).getText();
  }
}
