import { Injectable } from '@angular/core';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesServiceService {

  devices: string[] = [];

  constructor() { }

  addDevice(device: string) {
    if (this.devices.includes(device)) {
      this.devices = this.devices.filter(x => x !== device);
    }

    this.devices.push(device);
  }

  removeDevice(device: any): any {
    this.devices = this.devices.filter(x => x !== device);
  }


  getDevices() {
    return this.devices;
  }

}
