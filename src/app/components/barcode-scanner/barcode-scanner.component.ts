import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import * as Quagga from 'quagga';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Router } from '@angular/router';

@Component({
  selector: 'barcode-scanner',
  templateUrl: 'barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit {
  barcode = '';

  configQuagga = {
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: '#interactive',
      constraints: {
        width: 1915,
        height: 1050,
        aspectRatio: { min: 1, max: 100 },
        facingMode: 'environment', // or user
      },
      area: {
        top: "30%",
        bottom: "63%",
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

  constructor(private ref: ChangeDetectorRef, private devicesService: DevicesServiceService, private router: Router) { }


  numberOfScannedBarcodes() {
    return this.devicesService.getDevices().length;
  }

  @ViewChild('interactive') elementView: ElementRef;
  marginLeft = 0;
  marginTop = 0;


  ngOnInit() {
    console.log('Barcode: initialization');
    this.startScanner();
  }

  testChangeValues() {
    this.barcode = 'Code-barres bidon : 0123456789';
  }

  startScanner() {
    this.barcode = '';
    this.ref.detectChanges();

    Quagga.onProcessed((result) => this.onProcessed(result));

    Quagga.onDetected((result) => this.logCode(result));

    Quagga.init(this.configQuagga, (err) => {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
      this.isLandscapeCamera();
      console.log('Barcode: initialization finished. Ready to start');
    });


  }

  private onProcessed(result: any) {
    this.isLandscapeCamera();

    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
        result.boxes.filter(box => {
          return box !== result.box;
        }).forEach(box => {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 8 });
        });
      }

    }
  }

  private logCode(result) {
    const code = result.codeResult.code;
    if (this.barcode !== code) {
      this.barcode = '' + code;
      this.ref.detectChanges();
      console.log(this.barcode);
      this.devicesService.addDevice(this.barcode);
      Quagga.stop();
      this.router.navigateByUrl('devices');

      //this.dialogRef.close(this.barcode);
    }

  }


  isLandscapeCamera() {
    const height = this.elementView.nativeElement.offsetHeight;
    const width = this.elementView.nativeElement.offsetWidth;

    if (width > height) {
      this.marginLeft = -1280;
      this.marginTop = 0;
    } else {
      this.marginLeft = 0;
      this.marginTop = -1280;
    }

  }
}
