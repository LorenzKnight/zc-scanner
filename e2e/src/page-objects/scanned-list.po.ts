import { browser, by, element } from 'protractor';
import {elementEnd} from "@angular/core/src/render3";

export class ScannedListPage {
  static url: string = browser.baseUrl + '/';

  static sel(id) { return by.css(`[data-test-id="${id}"]`) }

  numberOfBarcodes = element(ScannedListPage.sel('scannedBarcodes'));
  imeiInput = element(ScannedListPage.sel('imeiInput'));
  addImeiButton = element(ScannedListPage.sel('addImeiButton'));
  scannedDevice = element.all(ScannedListPage.sel('scannedDevice'));
  doneLink = element.all(ScannedListPage.sel('doneLink'));
  addManualButton = element(ScannedListPage.sel('addManualButton'));

  navigateTo() {
    return browser.get(browser.baseUrl + '/devices/manual').then(() => browser.waitForAngular() );
  }

  getNumberOfScannedBarcodes() {
    return this.numberOfBarcodes.getText().then(val => val.valueOf());
  }

  deleteIMEI(imei: string) {
    let e = element(ScannedListPage.sel(imei));
    e.click();
    return e;
  }
}
