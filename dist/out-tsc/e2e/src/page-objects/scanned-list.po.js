import { browser, by, element } from 'protractor';
var ScannedListPage = /** @class */ (function () {
    function ScannedListPage() {
        this.numberOfBarcodes = element(ScannedListPage.sel('scannedBarcodes'));
        this.imeiInput = element(ScannedListPage.sel('imeiInput'));
        this.addImeiButton = element(ScannedListPage.sel('addImeiButton'));
        this.scannedDevice = element.all(ScannedListPage.sel('scannedDevice'));
        this.doneLink = element.all(ScannedListPage.sel('doneLink'));
        this.addManualButton = element(ScannedListPage.sel('addManualButton'));
    }
    ScannedListPage.sel = function (id) { return by.css("[data-test-id=\"" + id + "\"]"); };
    ScannedListPage.prototype.navigateTo = function () {
        return browser.get(browser.baseUrl + '/devices/manual').then(function () { return browser.waitForAngular(); });
    };
    ScannedListPage.prototype.getNumberOfScannedBarcodes = function () {
        return this.numberOfBarcodes.getText().then(function (val) { return val.valueOf(); });
    };
    ScannedListPage.prototype.deleteIMEI = function (imei) {
        var e = element(ScannedListPage.sel(imei));
        e.click();
        return e;
    };
    ScannedListPage.url = browser.baseUrl + '/';
    return ScannedListPage;
}());
export { ScannedListPage };
//# sourceMappingURL=scanned-list.po.js.map