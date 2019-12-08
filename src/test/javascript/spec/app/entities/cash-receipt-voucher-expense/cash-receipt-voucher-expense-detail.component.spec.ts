import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { CashReceiptVoucherExpenseDetailComponent } from 'app/entities/cash-receipt-voucher-expense/cash-receipt-voucher-expense-detail.component';
import { CashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';

describe('Component Tests', () => {
  describe('CashReceiptVoucherExpense Management Detail Component', () => {
    let comp: CashReceiptVoucherExpenseDetailComponent;
    let fixture: ComponentFixture<CashReceiptVoucherExpenseDetailComponent>;
    const route = ({ data: of({ cashReceiptVoucherExpense: new CashReceiptVoucherExpense(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashReceiptVoucherExpenseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CashReceiptVoucherExpenseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashReceiptVoucherExpenseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cashReceiptVoucherExpense).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
