import {HomeScreenPage} from '../page-objects/home-screen.po';
import {$, browser, by, element, logging} from 'protractor';
import {LoginPage} from "../page-objects/login.po";
import {AddDevicePage} from "../page-objects/add-device.po";

describe('Login screen', () => {
  let page: LoginPage;

  let defaultUsername: string = 'jonas';
  let defaultPassword: string = 'jonassecret';


  beforeEach(() => {
    page = new LoginPage();
  });

  it('login with the test user', () => {
    page.navigateTo();
    page.login(defaultUsername, defaultPassword);

    browser.getCurrentUrl().then(url => expect(url + '/').toMatch(HomeScreenPage.url));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
