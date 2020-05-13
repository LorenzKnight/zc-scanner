import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as crypto from 'crypto-js';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http"; //copied from model.service.ts
import { map } from "rxjs/operators";
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
var AuthService = /** @class */ (function () {
    function AuthService(http, cookieService, adalSvc) {
        this.http = http;
        this.cookieService = cookieService;
        this.adalSvc = adalSvc;
        this.user = this.adalSvc.LoggedInUserName; // Gets the LoggedInUserName
    }
    AuthService.prototype.getUsers = function () {
        return this.http.get('/assets/users.json');
    };
    AuthService.prototype.getApiKey = function () {
        var _this = this;
        return this.http.get('/assets/users.json').pipe(map(function (n) {
            return n[_this.user];
        }));
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var user = this.user;
        if (user) {
            try {
                this.getApiKey().subscribe(function (userApiKey) {
                    var payload = crypto.AES.decrypt(user, password);
                    console.log(JSON.parse(payload.toString(crypto.enc.Utf8)));
                    _this.currentUser = new User(user, userApiKey);
                    _this.cookieService.set('token', _this.currentUser.apiKey);
                });
                return true;
            }
            catch (e) {
                // Fall through to return below
            }
        }
        return false;
    };
    AuthService.prototype.getUser = function () {
        return this.currentUser;
    };
    AuthService.prototype.isLoggedIn = function () {
        return !!this.cookieService.get('token');
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, CookieService, MsAdalAngular6Service])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map