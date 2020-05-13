import { browser, by, element } from 'protractor';

export class AddDevicePage {
  static url = browser.baseUrl + "/add";
  static sel(id) { return by.css(`[data-test-id="${id}"]`) }

  addManualButton = element(AddDevicePage.sel('addManualButton'));
  scanButton = element(AddDevicePage.sel('scanButton'));
  deviceSelect = element(AddDevicePage.sel('deviceSelect'));
  modelSelect = element(AddDevicePage.sel('modelSelect'));
  startDate = element(AddDevicePage.sel('startDate'));
  endDate = element(AddDevicePage.sel('endDate'));
  backLink = element(AddDevicePage.sel('backLink'));

  navigateTo() {
    return browser.get(browser.baseUrl + "/add").then(() => browser.waitForAngular() );
  }

  chooseDevice(device: string) {

    this.deviceSelect.click();
    element(by.cssContainingText('span.mat-option-text', device)).click();

  }

  chooseModel(model: string) {
    this.modelSelect.click().then(() => {
      element(by.cssContainingText('span.mat-option-text', model)).click()
    });
  }




}
