import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DevicesServiceService } from 'src/app/services/devices-service.service';
import { Device } from 'src/app/models/device';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
  public devices: DevicesServiceService) {}

  ngOnInit() {
    console.log(this.route.paramMap);

    let bap = this.route.snapshot.paramMap.get('scanningType');

    if ('manual' === bap) {
      this.openDialog();
    }
  }


  remove(device) {
    this.devices.removeDevice(device);
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(ManualEntryDialog, {
        width: '250px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.devices.addDevice(result);
      }
      });
    }

    numberOfScannedBarcodes() {
      return this.devices.getDevices().length;
    }
}



@Component({
  selector: 'manual-entry-dialog',
  templateUrl: 'manual-entry-dialog.html'
})
export class ManualEntryDialog {

  constructor(
    public dialogRef: MatDialogRef<ManualEntryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,) {}

  add(): void {
    if (!this.fg.invalid) {
      this.dialogRef.close(this.fg.controls.barcode.value);
    }
  }


    hasError(control: string, error: string) {
      return this.fg.controls[control].hasError(error);
    }
    fg = this.fb.group({
      barcode: ['', Validators.compose([Validators.required, Validators.maxLength(13), Validators.minLength(13)])]
    })
  ;

}
