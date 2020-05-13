import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import * as Quagga from 'quagga';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ServicedeskService} from '../../services/servicedesk.service';
import {BarcodeScannerComponent} from '../barcode-scanner/barcode-scanner.component';
import { Device } from 'src/app/models/device';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
import {ModelService} from "../../services/model.service";
import * as moment from "moment";


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder,
              private serviceDesk: ServicedeskService,
              public devicesService: DevicesServiceService,
              private modelService: ModelService) {

    modelService.getModels().subscribe(x => {
      this.models = x;
    })
  }

  barcodes = [];
  models: [];

  fg = this.fb.group({
    device: [''],
    model: [''],
    start: [moment()],
    end: [this.leaseEnd()],
    barcode: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(15)])]
  });

  leaseEnd() {
    var leaseEnd = moment().add(2, 'years');

    return leaseEnd;
  }

  ngOnInit() {
    console.log('Barcode: initialization');
  }

  openDialog() {
    const dialogRef = this.dialog.open(BarcodeScannerComponent);

    // this.startScanner();
    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(`Dialog result: ${result}`);

      if (result.length === 15 && /[0-9]+/.test(result)) {
        this.barcodes.push(result);
      } else {
        this.dialog.open(DialogInvalidBarcodeComponent);
      }
    });
  }

  onEnter() {
    const control = this.fg.controls['barcode'];

    if (!control.errors) {
      const value: string = this.fg.controls['barcode'].value;
      this.addBarcode(value);
      this.fg.controls['barcode'].reset('');
    }
  }

  addBarcode(barcode: string) {
    const index = this.barcodes.indexOf(barcode);
    if (-1 === index) {
      this.barcodes.unshift(barcode);
    } else {
      this.playAudio();
      this.barcodes = this.barcodes.filter(x => x !== barcode);
      this.addBarcode(barcode);
    }
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/sounds/moo.mp3";
    audio.load();
    audio.play();
  }

  hasError(control: string, error: string) {
    return this.fg.controls[control].hasError(error);
  }

  save() {
    const meta = this.fg.getRawValue();
    const devices = this.devicesService.getDevices().map(barcode => new Device(meta.device, meta.model, meta.start, meta.end, barcode));
    console.log(devices);
    this.serviceDesk.addDevice(devices);
  }

  isScanningEnabled() : boolean {
    return this.hasError('device', 'required') || this.hasError('model', 'required')  ? true : false;
  }
}

@Component({
  selector: 'dialog-invalid-barcode',
  templateUrl: 'dialog-invalid-barcode.html',
  styleUrls: ['./add-device.component.css']
})
export class DialogInvalidBarcodeComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef, public dialogRef: MatDialogRef<DialogInvalidBarcodeComponent>) { }

  ngOnInit() {
  }

}
