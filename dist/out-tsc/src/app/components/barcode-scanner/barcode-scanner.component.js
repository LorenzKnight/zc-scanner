import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import * as Quagga from 'quagga';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
var BarcodeScannerComponent = /** @class */ (function () {
    function BarcodeScannerComponent(ref, devicesService) {
        this.ref = ref;
        this.devicesService = devicesService;
        this.barcode = '';
        this.configQuagga = {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: '#interactive',
                constraints: {
                    width: 2050,
                    height: 1050,
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: 'environment',
                },
                area: {
                    top: "25%",
                    bottom: "70%",
                    left: "20%",
                    right: "20%"
                },
                singleChannel: false // true: only the red color-channel is read
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            locate: false,
            numOfWorkers: 4,
            decoder: {
                readers: ['code_128_reader'],
                debug: {
                    drawBoundingBox: true,
                    drawScanline: true,
                }
            }
        };
        this.marginLeft = 0;
        this.marginTop = 0;
    }
    BarcodeScannerComponent.prototype.ngOnInit = function () {
        console.log('Barcode: initialization');
        this.startScanner();
    };
    BarcodeScannerComponent.prototype.testChangeValues = function () {
        this.barcode = 'Code-barres bidon : 0123456789';
    };
    BarcodeScannerComponent.prototype.startScanner = function () {
        var _this = this;
        this.barcode = '';
        this.ref.detectChanges();
        Quagga.onProcessed(function (result) { return _this.onProcessed(result); });
        Quagga.onDetected(function (result) { return _this.logCode(result); });
        Quagga.init(this.configQuagga, function (err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
            _this.isLandscapeCamera();
            console.log('Barcode: initialization finished. Ready to start');
        });
    };
    BarcodeScannerComponent.prototype.onProcessed = function (result) {
        this.isLandscapeCamera();
        var drawingCtx = Quagga.canvas.ctx.overlay;
        var drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 8 });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
            }
            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    };
    BarcodeScannerComponent.prototype.logCode = function (result) {
        var code = result.codeResult.code;
        if (this.barcode !== code) {
            this.barcode = '' + code;
            this.ref.detectChanges();
            console.log(this.barcode);
            this.devicesService.addDevice(this.barcode);
            Quagga.stop();
            //this.dialogRef.close(this.barcode);
        }
    };
    BarcodeScannerComponent.prototype.isLandscapeCamera = function () {
        var height = this.elementView.nativeElement.offsetHeight;
        var width = this.elementView.nativeElement.offsetWidth;
        if (width > height) {
            this.marginLeft = -1280;
            this.marginTop = 0;
        }
        else {
            this.marginLeft = 0;
            this.marginTop = -1280;
        }
    };
    tslib_1.__decorate([
        ViewChild('interactive'),
        tslib_1.__metadata("design:type", ElementRef)
    ], BarcodeScannerComponent.prototype, "elementView", void 0);
    BarcodeScannerComponent = tslib_1.__decorate([
        Component({
            selector: 'barcode-scanner',
            templateUrl: 'barcode-scanner.component.html',
            styleUrls: ['./barcode-scanner.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, DevicesServiceService])
    ], BarcodeScannerComponent);
    return BarcodeScannerComponent;
}());
export { BarcodeScannerComponent };
//# sourceMappingURL=barcode-scanner.component.js.map