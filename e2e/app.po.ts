import { browser, element, by } from 'protractor';

export class ImanPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.tagName('home')).getTagName();
  }
}
