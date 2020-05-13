import { AddDevicePage } from "../page-objects/add-device.po";
import { browser } from "protractor";
import { HomeScreenPage } from "../page-objects/home-screen.po";
import { LoginPage } from "../page-objects/login.po";
import * as moment from "moment";
describe('Add device', function () {
    var page;
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.navigateTo();
        loginPage.login(LoginPage.defaultUsername, LoginPage.defaultPassword);
        page = new AddDevicePage();
    });
    it('should disable buttons before choosing device and model', function () {
        page.navigateTo();
        expect(page.addManualButton.isEnabled()).toEqual(false);
        expect(page.scanButton.isEnabled()).toEqual(false);
    });
    it('should enable buttons after choosing device and model', function () {
        page.navigateTo();
        page.chooseModel('iPhone Xr');
        expect(page.addManualButton.isEnabled()).toEqual(true);
        expect(page.scanButton.isEnabled()).toEqual(true);
    });
    it('should have todays date filled in as start', function () {
        page.navigateTo();
        expect(page.startDate.getAttribute('value')).toEqual(moment().format('l'));
    });
    it('should have 2 years from now filled in as end', function () {
        page.navigateTo();
        expect(page.endDate.getAttribute('value'))
            .toEqual(moment().add(2, 'years').format('l'));
    });
    it('should take you to the home screen if you press back', function () {
        page.navigateTo();
        page.backLink.click();
        browser.getCurrentUrl().then(function (url) { return expect(url + '/').toMatch(HomeScreenPage.url); });
    });
});
//# sourceMappingURL=add-device.e2e-spec.js.map