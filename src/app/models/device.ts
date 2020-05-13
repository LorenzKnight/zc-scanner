export class Device {
  device: string;
  model: string;
  start: string;
  end: string;
  imei: string;

  constructor(device: string, model: string, start: string, end: string, imei: string) {
    this.device = device;
    this.model = model;
    this.start = start;
    this.end = end;
    this.imei = imei;
  }
}
