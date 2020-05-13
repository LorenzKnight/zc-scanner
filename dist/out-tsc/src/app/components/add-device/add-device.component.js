import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicedeskService } from '../../services/servicedesk.service';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
import { Device } from 'src/app/models/device';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
import { ModelService } from "../../services/model.service";
import * as moment from "moment";
var AddDeviceComponent = /** @class */ (function () {
    function AddDeviceComponent(dialog, ref, fb, serviceDesk, devicesService, modelService) {
        var _this = this;
        this.dialog = dialog;
        this.ref = ref;
        this.fb = fb;
        this.serviceDesk = serviceDesk;
        this.devicesService = devicesService;
        this.modelService = modelService;
        this.barcodes = [];
        this.fg = this.fb.group({
            device: [''],
            model: [''],
            start: [moment()],
            end: [this.leaseEnd()],
            barcode: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(15)])]
        });
        modelService.getModels().subscribe(function (x) {
            _this.models = x;
        });
    }
    AddDeviceComponent.prototype.leaseEnd = function () {
        var leaseEnd = moment().add(2, 'years');
        return leaseEnd;
    };
    AddDeviceComponent.prototype.ngOnInit = function () {
        console.log('Barcode: initialization');
    };
    AddDeviceComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(BarcodeScannerComponent);
        // this.startScanner();
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
            if (result.length === 15 && /[0-9]+/.test(result)) {
                _this.barcodes.push(result);
            }
            else {
                _this.dialog.open(DialogInvalidBarcodeComponent);
            }
        });
    };
    AddDeviceComponent.prototype.onEnter = function () {
        var control = this.fg.controls['barcode'];
        if (!control.errors) {
            var value = this.fg.controls['barcode'].value;
            this.addBarcode(value);
            this.fg.controls['barcode'].reset('');
        }
    };
    AddDeviceComponent.prototype.addBarcode = function (barcode) {
        var index = this.barcodes.indexOf(barcode);
        if (-1 === index) {
            this.barcodes.unshift(barcode);
        }
        else {
            this.playAudio();
            this.barcodes = this.barcodes.filter(function (x) { return x !== barcode; });
            this.addBarcode(barcode);
        }
    };
    AddDeviceComponent.prototype.playAudio = function () {
        var audio = new Audio();
        audio.src = "../../../assets/sounds/moo.mp3";
        audio.load();
        audio.play();
    };
    AddDeviceComponent.prototype.hasError = function (control, error) {
        return this.fg.controls[control].hasError(error);
    };
    AddDeviceComponent.prototype.save = function () {
        var meta = this.fg.getRawValue();
        var devices = this.devicesService.getDevices().map(function (barcode) { return new Device(meta.device, meta.model, meta.start, meta.end, barcode); });
        console.log(devices);
        this.serviceDesk.addDevice(devices);
    };
    AddDeviceComponent.prototype.isScanningEnabled = function () {
        return this.hasError('device', 'required') || this.hasError('model', 'required') ? true : false;
    };
    AddDeviceComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-device',
            templateUrl: './add-device.component.html',
            styleUrls: ['./add-device.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            ChangeDetectorRef,
            FormBuilder,
            ServicedeskService,
            DevicesServiceService,
            ModelService])
    ], AddDeviceComponent);
    return AddDeviceComponent;
}());
export { AddDeviceComponent };
var DialogInvalidBarcodeComponent = /** @class */ (function () {
    function DialogInvalidBarcodeComponent(ref, dialogRef) {
        this.ref = ref;
        this.dialogRef = dialogRef;
    }
    DialogInvalidBarcodeComponent.prototype.ngOnInit = function () {
    };
    DialogInvalidBarcodeComponent = tslib_1.__decorate([
        Component({
            selector: 'dialog-invalid-barcode',
            templateUrl: 'dialog-invalid-barcode.html',
            styleUrls: ['./add-device.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, MatDialogRef])
    ], DialogInvalidBarcodeComponent);
    return DialogInvalidBarcodeComponent;
}());
export { DialogInvalidBarcodeComponent };
//# sourceMappingURL=add-device.component.js.map