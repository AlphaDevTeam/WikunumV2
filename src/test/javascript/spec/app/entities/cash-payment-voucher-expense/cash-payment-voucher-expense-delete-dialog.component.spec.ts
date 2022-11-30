import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashPaymentVoucherExpenseDeleteDialogComponent } from 'app/entities/cash-payment-voucher-expense/cash-payment-voucher-expense-delete-dialog.component';
import { CashPaymentVoucherExpenseService } from 'app/entities/cash-payment-voucher-expense/cash-payment-voucher-expense.service';

describe('Component Tests', () => {
  describe('CashPaymentVoucherExpense Management Delete Component', () => {
    let comp: CashPaymentVoucherExpenseDeleteDialogComponent;
    let fixture: ComponentFixture<CashPaymentVoucherExpenseDeleteDialogComponent>;
    let service: CashPaymentVoucherExpenseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashPaymentVoucherExpenseDeleteDialogComponent]
      })
        .overrideTemplate(CashPaymentVoucherExpenseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashPaymentVoucherExpenseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashPaymentVoucherExpenseService);
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
