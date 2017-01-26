import { ImanPage } from './app.po';

describe('iman App', function() {
  let page: ImanPage;

  beforeEach(() => {
    page = new ImanPage();
  });

  it('should display message home', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('home');
  });
});
