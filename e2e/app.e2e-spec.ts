import { SeeyondPage } from './app.po';

describe('seeyond App', function() {
  let page: SeeyondPage;

  beforeEach(() => {
    page = new SeeyondPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
