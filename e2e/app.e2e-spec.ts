import { OpenTranslatePage } from './app.po';

describe('open-translate App', () => {
  let page: OpenTranslatePage;

  beforeEach(() => {
    page = new OpenTranslatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
