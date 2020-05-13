import {AddDevicePage} from "../page-objects/add-device.po";
import {ScannedListPage} from "../page-objects/scanned-list.po";
import {browser} from "protractor";
import {hasClassName} from "@ng-bootstrap/ng-bootstrap/util/util";
import {LoginPage} from "../page-objects/login.po";


describe('Scanned devices list', () => {

  var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  };

  let page: ScannedListPage;

  beforeEach(() => {
    let loginPage = new LoginPage();

    loginPage.navigateTo();
    loginPage.login(LoginPage.defaultUsername, LoginPage.defaultPassword);

    page = new ScannedListPage();
  });


  it('should initially not be any scanned devices', () => {
    page.navigateTo();

    expect(page.getNumberOfScannedBarcodes()).toEqual('0');
  });

  it('should show the modal for adding a new IMEI at start', () => {
    page.navigateTo();

    expect(page.imeiInput.isPresent).toBeTruthy();
  });

  it('should show error if empty IMEI is added', () => {
    page.navigateTo();
    browser.sleep(5000);
    page.addImeiButton.click();

    expect(hasClass(page.imeiInput, 'ng-invalid')).toBe(true);
  });

  it('should show error if too short IMEI is added', () => {
    page.navigateTo();

    page.imeiInput.sendKeys('123213'); // To short
    page.addImeiButton.click();

    expect(hasClass(page.imeiInput, 'ng-invalid')).toBe(true);
  });

  it('should show error if IMEI with characters is added', () => {
    page.navigateTo();

    page.imeiInput.sendKeys('a2bc13'); // To short
    expect(page.imeiInput.getAttribute("value")).toBe("21-3_____-______-_"); // Including the mask
    expect(hasClass(page.imeiInput, 'ng-invalid')).toBe(true);
  });

  it('should add a valid IMEI to the list and increase the count', () => {
    page.navigateTo();
    const imei = '123123213213123';

    page.imeiInput.sendKeys(imei);
    page.addImeiButton.click();

    browser.sleep(500); // FIXME

    expect(page.imeiInput.isPresent()).toBeFalsy();
    expect(page.getNumberOfScannedBarcodes()).toBe('1');
    expect(page.scannedDevice.count()).toBe(1);
    expect(page.scannedDevice.getText()).toContain(imei);
  });

  it('should delete the imei from the list if its deleted', () => {
    page.navigateTo();

    const imei = '123123213213123';

    page.imeiInput.sendKeys(imei);
    page.addImeiButton.click();

    browser.sleep(500); // FIXME
    let removedElement = page.deleteIMEI(imei);

    expect(removedElement.isPresent()).toBeFalsy();
    expect(page.scannedDevice.count()).toBe(0);
  });

  it('should add new IMEIs to the top of the list', () => {
    page.navigateTo();

    const imei = '123123213213123';

    page.imeiInput.sendKeys(imei);
    page.addImeiButton.click();

    browser.sleep(500);
    page.addManualButton.click();

    browser.sleep(500);
    const imei2 = '567567567567567';

    page.imeiInput.sendKeys(imei2);
    page.addImeiButton.click();

    browser.sleep(500);
    expect(page.getNumberOfScannedBarcodes()).toBe('2');
    expect(page.scannedDevice.getText()).toContain(imei);
    expect(page.scannedDevice.getText()).toContain(imei2);
  });

  it('should move duplicated IMEIs to the top of the list', () => {
    page.navigateTo();

    const imei = '123123213213123';

    page.imeiInput.sendKeys(imei);
    page.addImeiButton.click();

    browser.sleep(500);
    page.addManualButton.click();

    browser.sleep(500);
    const imei2 = '567567567567567';

    page.imeiInput.sendKeys(imei2);
    page.addImeiButton.click();


    browser.sleep(500);
    page.addManualButton.click();

    browser.sleep(500);

    page.imeiInput.sendKeys(imei);
    page.addImeiButton.click();

    browser.sleep(500);
    expect(page.getNumberOfScannedBarcodes()).toBe('2');
    expect(page.scannedDevice.getText()).toContain(imei);
    expect(page.scannedDevice.getText()).toContain(imei2);

  });

  it('should take to back to the scanner view when clicking done', () => {
    page.navigateTo();

    // We add an IMEI just to hide the modal
    page.imeiInput.sendKeys('123123213213123');
    page.addImeiButton.click();

    page.doneLink.click();

    expect(browser.getCurrentUrl()).toBe(AddDevicePage.url);
  });
});
