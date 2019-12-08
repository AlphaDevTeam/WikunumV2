import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashPaymentVoucherSupplierDeleteDialogComponent } from 'app/entities/cash-payment-voucher-supplier/cash-payment-voucher-supplier-delete-dialog.component';
import { CashPaymentVoucherSupplierService } from 'app/entities/cash-payment-voucher-supplier/cash-payment-voucher-supplier.service';

describe('Component Tests', () => {
  describe('CashPaymentVoucherSupplier Management Delete Component', () => {
    let comp: CashPaymentVoucherSupplierDeleteDialogComponent;
    let fixture: ComponentFixture<CashPaymentVoucherSupplierDeleteDialogComponent>;
    let service: CashPaymentVoucherSupplierService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashPaymentVoucherSupplierDeleteDialogComponent]
      })
        .overrideTemplate(CashPaymentVoucherSupplierDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashPaymentVoucherSupplierDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashPaymentVoucherSupplierService);
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
