import { I2pPage } from './app.po';

describe('i2p App', () => {
  let page: I2pPage;

  beforeEach(() => {
    page = new I2pPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
