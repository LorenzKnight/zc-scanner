var _this = this;
import * as tslib_1 from "tslib";
import { HomeScreenPage } from '../page-objects/home-screen.po';
import { browser, logging } from 'protractor';
import { LoginPage } from "../page-objects/login.po";
describe('Home screen', function () {
    var page;
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.navigateTo();
        loginPage.login(LoginPage.defaultUsername, LoginPage.defaultPassword);
        page = new HomeScreenPage();
    });
    it('should display welcome message', function () {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome');
    });
    afterEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var logs;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.manage().logs().get(logging.Type.BROWSER)];
                case 1:
                    logs = _a.sent();
                    expect(logs).not.toContain(jasmine.objectContaining({
                        level: logging.Level.SEVERE,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=home-screen.e2e-spec.js.map