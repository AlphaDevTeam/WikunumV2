import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { CashPaymentVoucherCustomerDetailComponent } from 'app/entities/cash-payment-voucher-customer/cash-payment-voucher-customer-detail.component';
import { CashPaymentVoucherCustomer } from 'app/shared/model/cash-payment-voucher-customer.model';

describe('Component Tests', () => {
  describe('CashPaymentVoucherCustomer Management Detail Component', () => {
    let comp: CashPaymentVoucherCustomerDetailComponent;
    let fixture: ComponentFixture<CashPaymentVoucherCustomerDetailComponent>;
    const route = ({ data: of({ cashPaymentVoucherCustomer: new CashPaymentVoucherCustomer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashPaymentVoucherCustomerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CashPaymentVoucherCustomerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashPaymentVoucherCustomerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cashPaymentVoucherCustomer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});