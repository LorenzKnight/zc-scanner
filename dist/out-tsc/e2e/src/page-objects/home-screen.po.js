import { browser, by, element } from 'protractor';
var HomeScreenPage = /** @class */ (function () {
    function HomeScreenPage() {
        this.currentUser = element(HomeScreenPage.sel('currentUser'));
        this.usersSelect = element(HomeScreenPage.sel('usersSelect'));
        this.addButton = element(HomeScreenPage.sel("addButton"));
        this.scanButton = element(HomeScreenPage.sel("scanButton"));
    }
    HomeScreenPage.sel = function (id) { return by.css("[data-test-id=\"" + id + "\"]"); };
    HomeScreenPage.prototype.navigateTo = function () {
        return browser.get(browser.baseUrl).then(function () { return browser.waitForAngular(); });
    };
    HomeScreenPage.prototype.getTitleText = function () {
        return element(by.css('app-root h4')).getText();
    };
    HomeScreenPage.prototype.isLoggedIn = function () {
        return this.currentUser.getText().then(function (x) { return x !== "Log in"; });
    };
    HomeScreenPage.prototype.selectUser = function (name) {
        this.currentUser.click();
        this.usersSelect.click();
        element(by.cssContainingText('span.mat-option-text', name)).click();
    };
    HomeScreenPage.url = browser.baseUrl;
    return HomeScreenPage;
}());
export { HomeScreenPage };
//# sourceMappingURL=home-screen.po.js.map