import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class ServicedeskService {

  constructor(private http: HttpClient) { }

  addDevice(devices: Device[]) {
    console.log(devices);
    const headers = {
      'Content-Type': 'text/plain'

    };

    const payload = `
    <?xml version='1.0' encoding='UTF-8'?>
    <API version='1.0' locale='en'>
      <records>
        <record>
          <parameter>
            <name>CI Type</name>
            <value>Smart Phone</value>
          </parameter>
          <parameter>
            <name>CI Name</name>
            <value>test11223</value>
          </parameter>
          <parameter>
            <name>Product Name</name>
            <value>Iphone XR</value>
          </parameter>
          <parameter>
            <name>Acquisition Date</name>
            <value>2018-04-03</value>
          </parameter>
          <parameter>
            <name>Expiry Date</name>
            <value>2020-04-03</value>
          </parameter>
          <parameter>
            <name>Asset State</name>
            <value>In Use</value>
          </parameter>
          <multi-valued-parameter name="Assign Ownership">
            <record>
              <parameter>
                <name>User</name>
                <value>Jan Scholte</value>
              </parameter>
              <parameter>
                <name>Department</name>
                <value>Active Safety</value>
              </parameter>
            </record>
            </multi-valued-parameter>
          </record>
        </records>
      </API>
    `;

    const request = `/api/cmdb/ci?OPERATION_NAME=add&TECHNICIAN_KEY=$API_KEY_HERE&INPUT_DATA=<?xml version='1.0' encoding='UTF-8'?>`;

    this.http.get(request, {headers: new HttpHeaders(headers)}).subscribe(n => console.log(n));
    console.log("add device"); 

  }
}
