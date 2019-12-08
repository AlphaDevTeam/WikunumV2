import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { ExpenseAccountBalanceDetailComponent } from 'app/entities/expense-account-balance/expense-account-balance-detail.component';
import { ExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';

describe('Component Tests', () => {
  describe('ExpenseAccountBalance Management Detail Component', () => {
    let comp: ExpenseAccountBalanceDetailComponent;
    let fixture: ComponentFixture<ExpenseAccountBalanceDetailComponent>;
    const route = ({ data: of({ expenseAccountBalance: new ExpenseAccountBalance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ExpenseAccountBalanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExpenseAccountBalanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpenseAccountBalanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.expenseAccountBalance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});