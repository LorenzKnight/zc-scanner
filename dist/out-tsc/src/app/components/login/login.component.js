import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, fb) {
        this.auth = auth;
        this.router = router;
        this.fb = fb;
        this.fg = this.fb.group({
            username: [''],
            password: ['']
        });
        this.invalidCredentials = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        this.invalidCredentials = false;
        var result = this.auth.login(this.fg.controls['username'].value, this.fg.controls['password'].value);
        if (result) {
            this.router.navigateByUrl('/');
        }
        else {
            this.invalidCredentials = true;
        }
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            Router,
            FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map