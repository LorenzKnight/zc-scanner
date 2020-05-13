import { browser, by, element } from 'protractor';

export class HomeScreenPage {
  static url: string = browser.baseUrl;

  static sel(id) { return by.css(`[data-test-id="${id}"]`) }

  currentUser = element(HomeScreenPage.sel('currentUser'));
  usersSelect = element(HomeScreenPage.sel('usersSelect'));
  addButton = element(HomeScreenPage.sel("addButton"));
  scanButton = element(HomeScreenPage.sel("scanButton"));

  navigateTo() {
    return browser.get(browser.baseUrl).then(() => browser.waitForAngular() );
  }

  getTitleText() {
    return element(by.css('app-root h4')).getText() as Promise<string>;
  }

  isLoggedIn() {
    return this.currentUser.getText().then(x => x !== "Log in");
  }

  selectUser(name: string) {
    this.currentUser.click();
    this.usersSelect.click();

    element(by.cssContainingText('span.mat-option-text', name)).click();
  }
}
