import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashReceiptVoucherCustomerDeleteDialogComponent } from 'app/entities/cash-receipt-voucher-customer/cash-receipt-voucher-customer-delete-dialog.component';
import { CashReceiptVoucherCustomerService } from 'app/entities/cash-receipt-voucher-customer/cash-receipt-voucher-customer.service';

describe('Component Tests', () => {
  describe('CashReceiptVoucherCustomer Management Delete Component', () => {
    let comp: CashReceiptVoucherCustomerDeleteDialogComponent;
    let fixture: ComponentFixture<CashReceiptVoucherCustomerDeleteDialogComponent>;
    let service: CashReceiptVoucherCustomerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashReceiptVoucherCustomerDeleteDialogComponent]
      })
        .overrideTemplate(CashReceiptVoucherCustomerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashReceiptVoucherCustomerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashReceiptVoucherCustomerService);
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
