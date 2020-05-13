import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
var ModelService = /** @class */ (function () {
    function ModelService(http) {
        this.http = http;
    }
    ModelService.prototype.getModels = function () {
        return this.http.get('/assets/models.json');
    };
    ModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ModelService);
    return ModelService;
}());
export { ModelService };
//# sourceMappingURL=model.service.js.map