import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashReceiptVoucherExpenseDeleteDialogComponent } from 'app/entities/cash-receipt-voucher-expense/cash-receipt-voucher-expense-delete-dialog.component';
import { CashReceiptVoucherExpenseService } from 'app/entities/cash-receipt-voucher-expense/cash-receipt-voucher-expense.service';

describe('Component Tests', () => {
  describe('CashReceiptVoucherExpense Management Delete Component', () => {
    let comp: CashReceiptVoucherExpenseDeleteDialogComponent;
    let fixture: ComponentFixture<CashReceiptVoucherExpenseDeleteDialogComponent>;
    let service: CashReceiptVoucherExpenseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashReceiptVoucherExpenseDeleteDialogComponent]
      })
        .overrideTemplate(CashReceiptVoucherExpenseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashReceiptVoucherExpenseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashReceiptVoucherExpenseService);
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
