import { browser, by, element } from 'protractor';

export class LoginPage {
  static url = browser.baseUrl + "/add";
  static sel(id) { return by.css(`[data-test-id="${id}"]`) }

  username = element(LoginPage.sel('username'));
  password = element(LoginPage.sel('password'));
  loginButton = element(LoginPage.sel('login'));

  static defaultUsername: string = 'jonas';
  static defaultPassword: string = 'jonassecret';


  navigateTo() {
    return browser.get(browser.baseUrl + "/login").then(() => browser.waitForAngular() );
  }

  login(username: string, password: string) {
    this.username.sendKeys(username);
    this.password.sendKeys(password);

    this.loginButton.click();

    browser.waitForAngular();
  }




}
