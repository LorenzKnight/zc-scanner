import {HomeScreenPage} from '../page-objects/home-screen.po';
import {$, browser, by, element, logging} from 'protractor';
import {LoginPage} from "../page-objects/login.po";

describe('Home screen', () => {
  let page: HomeScreenPage;

  beforeEach(() => {
    let loginPage = new LoginPage();

    loginPage.navigateTo();
    loginPage.login(LoginPage.defaultUsername, LoginPage.defaultPassword);

    page = new HomeScreenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
