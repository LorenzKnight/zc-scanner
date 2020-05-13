import { TestBed } from '@angular/core/testing';
import { ModelService } from './model.service';
describe('ModelService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ModelService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=model.service.spec.js.map