import { TestBed } from '@angular/core/testing';
import { ServicedeskService } from './servicedesk.service';
describe('ServicedeskService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ServicedeskService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=servicedesk.service.spec.js.map