import { TestBed } from '@angular/core/testing';
import { DevicesServiceService } from './devices-service.service';
describe('DevicesServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DevicesServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=devices-service.service.spec.js.map