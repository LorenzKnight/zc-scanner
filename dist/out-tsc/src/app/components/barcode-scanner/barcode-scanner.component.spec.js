import { async, TestBed } from '@angular/core/testing';
import { BarcodeScannerComponent } from './barcode-scanner.component';
describe('BarcodeScannerComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BarcodeScannerComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BarcodeScannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=barcode-scanner.component.spec.js.map