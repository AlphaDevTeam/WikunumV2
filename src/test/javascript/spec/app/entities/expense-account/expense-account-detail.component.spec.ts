import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { ExpenseAccountDetailComponent } from 'app/entities/expense-account/expense-account-detail.component';
import { ExpenseAccount } from 'app/shared/model/expense-account.model';

describe('Component Tests', () => {
  describe('ExpenseAccount Management Detail Component', () => {
    let comp: ExpenseAccountDetailComponent;
    let fixture: ComponentFixture<ExpenseAccountDetailComponent>;
    const route = ({ data: of({ expenseAccount: new ExpenseAccount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ExpenseAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExpenseAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpenseAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.expenseAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
