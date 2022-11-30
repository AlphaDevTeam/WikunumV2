import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { ExpenseAccountBalanceDeleteDialogComponent } from 'app/entities/expense-account-balance/expense-account-balance-delete-dialog.component';
import { ExpenseAccountBalanceService } from 'app/entities/expense-account-balance/expense-account-balance.service';

describe('Component Tests', () => {
  describe('ExpenseAccountBalance Management Delete Component', () => {
    let comp: ExpenseAccountBalanceDeleteDialogComponent;
    let fixture: ComponentFixture<ExpenseAccountBalanceDeleteDialogComponent>;
    let service: ExpenseAccountBalanceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ExpenseAccountBalanceDeleteDialogComponent]
      })
        .overrideTemplate(ExpenseAccountBalanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpenseAccountBalanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpenseAccountBalanceService);
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
