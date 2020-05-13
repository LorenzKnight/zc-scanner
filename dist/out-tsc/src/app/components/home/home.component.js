import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(auth) {
        var _this = this;
        this.auth = auth;
        this.showUsers = false;
        this.auth.getUsers().subscribe(function (data) { return _this.users = data; });
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map