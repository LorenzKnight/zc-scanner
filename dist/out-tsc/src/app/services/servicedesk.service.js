import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ServicedeskService = /** @class */ (function () {
    function ServicedeskService(http) {
        this.http = http;
    }
    ServicedeskService.prototype.addDevice = function (devices) {
        console.log(devices);
        var headers = {
            'Content-Type': 'text/plain'
        };
        var payload = "\n    <?xml version='1.0' encoding='UTF-8'?>\n    <API version='1.0' locale='en'>\n      <records>\n        <record>\n          <parameter>\n            <name>CI Type</name>\n            <value>Smart Phone</value>\n          </parameter>\n          <parameter>\n            <name>CI Name</name>\n            <value>test11223</value>\n          </parameter>\n          <parameter>\n            <name>Product Name</name>\n            <value>Iphone XR</value>\n          </parameter>\n          <parameter>\n            <name>Acquisition Date</name>\n            <value>2018-04-03</value>\n          </parameter>\n          <parameter>\n            <name>Expiry Date</name>\n            <value>2020-04-03</value>\n          </parameter>\n          <parameter>\n            <name>Asset State</name>\n            <value>In Use</value>\n          </parameter>\n          <multi-valued-parameter name=\"Assign Ownership\">\n            <record>\n              <parameter>\n                <name>User</name>\n                <value>Jan Scholte</value>\n              </parameter>\n              <parameter>\n                <name>Department</name>\n                <value>Active Safety</value>\n              </parameter>\n            </record>\n            </multi-valued-parameter>\n          </record>\n        </records>\n      </API>\n    ";
        var request = "/api/cmdb/ci?OPERATION_NAME=add&TECHNICIAN_KEY=$API_KEY_HERE&INPUT_DATA=<?xml version='1.0' encoding='UTF-8'?>";
        this.http.get(request, { headers: new HttpHeaders(headers) }).subscribe(function (n) { return console.log(n); });
        console.log("add device");
    };
    ServicedeskService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ServicedeskService);
    return ServicedeskService;
}());
export { ServicedeskService };
//# sourceMappingURL=servicedesk.service.js.map