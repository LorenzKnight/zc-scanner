import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
var DeviceListComponent = /** @class */ (function () {
    function DeviceListComponent(dialog, route, router, devices) {
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.devices = devices;
    }
    DeviceListComponent.prototype.ngOnInit = function () {
        console.log(this.route.paramMap);
        var bap = this.route.snapshot.paramMap.get('scanningType');
        if ('manual' === bap) {
            this.openDialog();
        }
    };
    DeviceListComponent.prototype.remove = function (device) {
        this.devices.removeDevice(device);
    };
    DeviceListComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ManualEntryDialog, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.devices.addDevice(result);
            }
        });
    };
    DeviceListComponent.prototype.numberOfScannedBarcodes = function () {
        return this.devices.getDevices().length;
    };
    DeviceListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-device-list',
            templateUrl: './device-list.component.html',
            styleUrls: ['./device-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, ActivatedRoute, Router,
            DevicesServiceService])
    ], DeviceListComponent);
    return DeviceListComponent;
}());
export { DeviceListComponent };
var ManualEntryDialog = /** @class */ (function () {
    function ManualEntryDialog(dialogRef, data, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.fg = this.fb.group({
            barcode: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(15)])]
        });
    }
    ManualEntryDialog.prototype.add = function () {
        if (!this.fg.invalid) {
            this.dialogRef.close(this.fg.controls.barcode.value);
        }
    };
    ManualEntryDialog.prototype.hasError = function (control, error) {
        return this.fg.controls[control].hasError(error);
    };
    ManualEntryDialog = tslib_1.__decorate([
        Component({
            selector: 'manual-entry-dialog',
            templateUrl: 'manual-entry-dialog.html',
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, FormBuilder])
    ], ManualEntryDialog);
    return ManualEntryDialog;
}());
export { ManualEntryDialog };
//# sourceMappingURL=device-list.component.js.map