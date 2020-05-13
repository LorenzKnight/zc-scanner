import { browser, by, element } from 'protractor';
var AddDevicePage = /** @class */ (function () {
    function AddDevicePage() {
        this.addManualButton = element(AddDevicePage.sel('addManualButton'));
        this.scanButton = element(AddDevicePage.sel('scanButton'));
        this.deviceSelect = element(AddDevicePage.sel('deviceSelect'));
        this.modelSelect = element(AddDevicePage.sel('modelSelect'));
        this.startDate = element(AddDevicePage.sel('startDate'));
        this.endDate = element(AddDevicePage.sel('endDate'));
        this.backLink = element(AddDevicePage.sel('backLink'));
    }
    AddDevicePage.sel = function (id) { return by.css("[data-test-id=\"" + id + "\"]"); };
    AddDevicePage.prototype.navigateTo = function () {
        return browser.get(browser.baseUrl + "/add").then(function () { return browser.waitForAngular(); });
    };
    AddDevicePage.prototype.chooseDevice = function (device) {
        this.deviceSelect.click();
        element(by.cssContainingText('span.mat-option-text', device)).click();
    };
    AddDevicePage.prototype.chooseModel = function (model) {
        this.modelSelect.click().then(function () {
            element(by.cssContainingText('span.mat-option-text', model)).click();
        });
    };
    AddDevicePage.url = browser.baseUrl + "/add";
    return AddDevicePage;
}());
export { AddDevicePage };
//# sourceMappingURL=add-device.po.js.map