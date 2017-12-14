import { CustomerAppPage } from './app.po';

describe('customer-app App', () => {
  let page: CustomerAppPage;

  beforeEach(() => {
    page = new CustomerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
