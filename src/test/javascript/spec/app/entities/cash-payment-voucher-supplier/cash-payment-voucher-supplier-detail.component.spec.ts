import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { CashPaymentVoucherSupplierDetailComponent } from 'app/entities/cash-payment-voucher-supplier/cash-payment-voucher-supplier-detail.component';
import { CashPaymentVoucherSupplier } from 'app/shared/model/cash-payment-voucher-supplier.model';

describe('Component Tests', () => {
  describe('CashPaymentVoucherSupplier Management Detail Component', () => {
    let comp: CashPaymentVoucherSupplierDetailComponent;
    let fixture: ComponentFixture<CashPaymentVoucherSupplierDetailComponent>;
    const route = ({ data: of({ cashPaymentVoucherSupplier: new CashPaymentVoucherSupplier(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashPaymentVoucherSupplierDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CashPaymentVoucherSupplierDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashPaymentVoucherSupplierDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cashPaymentVoucherSupplier).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});