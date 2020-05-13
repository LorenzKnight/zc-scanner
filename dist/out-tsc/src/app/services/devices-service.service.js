import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DevicesServiceService = /** @class */ (function () {
    function DevicesServiceService() {
        this.devices = [];
    }
    DevicesServiceService.prototype.addDevice = function (device) {
        if (this.devices.includes(device)) {
            this.devices = this.devices.filter(function (x) { return x !== device; });
        }
        this.devices.push(device);
    };
    DevicesServiceService.prototype.removeDevice = function (device) {
        this.devices = this.devices.filter(function (x) { return x !== device; });
    };
    DevicesServiceService.prototype.getDevices = function () {
        return this.devices;
    };
    DevicesServiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DevicesServiceService);
    return DevicesServiceService;
}());
export { DevicesServiceService };
//# sourceMappingURL=devices-service.service.js.map