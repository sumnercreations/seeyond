import { SeeyondPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('seeyond App', function() {
  let page: SeeyondPage;

  beforeEach(() => {
    page = new SeeyondPage();
  });

  it('should have an h1 header on initial load.', () => {
    page.navigateTo();
    var header = element(by.css('.title'));
    expect(header.isPresent()).toBeTruthy();
  });
});
