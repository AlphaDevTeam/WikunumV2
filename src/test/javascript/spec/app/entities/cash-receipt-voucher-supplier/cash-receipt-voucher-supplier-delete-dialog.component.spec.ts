import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashReceiptVoucherSupplierDeleteDialogComponent } from 'app/entities/cash-receipt-voucher-supplier/cash-receipt-voucher-supplier-delete-dialog.component';
import { CashReceiptVoucherSupplierService } from 'app/entities/cash-receipt-voucher-supplier/cash-receipt-voucher-supplier.service';

describe('Component Tests', () => {
  describe('CashReceiptVoucherSupplier Management Delete Component', () => {
    let comp: CashReceiptVoucherSupplierDeleteDialogComponent;
    let fixture: ComponentFixture<CashReceiptVoucherSupplierDeleteDialogComponent>;
    let service: CashReceiptVoucherSupplierService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashReceiptVoucherSupplierDeleteDialogComponent]
      })
        .overrideTemplate(CashReceiptVoucherSupplierDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashReceiptVoucherSupplierDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashReceiptVoucherSupplierService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
