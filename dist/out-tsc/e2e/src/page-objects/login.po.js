import { browser, by, element } from 'protractor';
var LoginPage = /** @class */ (function () {
    function LoginPage() {
        this.username = element(LoginPage.sel('username'));
        this.password = element(LoginPage.sel('password'));
        this.loginButton = element(LoginPage.sel('login'));
    }
    LoginPage.sel = function (id) { return by.css("[data-test-id=\"" + id + "\"]"); };
    LoginPage.prototype.navigateTo = function () {
        return browser.get(browser.baseUrl + "/login").then(function () { return browser.waitForAngular(); });
    };
    LoginPage.prototype.login = function (username, password) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.loginButton.click();
        browser.waitForAngular();
    };
    LoginPage.url = browser.baseUrl + "/add";
    LoginPage.defaultUsername = 'jonas';
    LoginPage.defaultPassword = 'jonassecret';
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.po.js.map