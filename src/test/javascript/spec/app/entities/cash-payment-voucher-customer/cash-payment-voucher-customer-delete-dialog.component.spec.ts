import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashPaymentVoucherCustomerDeleteDialogComponent } from 'app/entities/cash-payment-voucher-customer/cash-payment-voucher-customer-delete-dialog.component';
import { CashPaymentVoucherCustomerService } from 'app/entities/cash-payment-voucher-customer/cash-payment-voucher-customer.service';

describe('Component Tests', () => {
  describe('CashPaymentVoucherCustomer Management Delete Component', () => {
    let comp: CashPaymentVoucherCustomerDeleteDialogComponent;
    let fixture: ComponentFixture<CashPaymentVoucherCustomerDeleteDialogComponent>;
    let service: CashPaymentVoucherCustomerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashPaymentVoucherCustomerDeleteDialogComponent]
      })
        .overrideTemplate(CashPaymentVoucherCustomerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashPaymentVoucherCustomerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashPaymentVoucherCustomerService);
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
