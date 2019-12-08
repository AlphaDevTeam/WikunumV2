import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { ExpenseDeleteDialogComponent } from 'app/entities/expense/expense-delete-dialog.component';
import { ExpenseService } from 'app/entities/expense/expense.service';

describe('Component Tests', () => {
  describe('Expense Management Delete Component', () => {
    let comp: ExpenseDeleteDialogComponent;
    let fixture: ComponentFixture<ExpenseDeleteDialogComponent>;
    let service: ExpenseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ExpenseDeleteDialogComponent]
      })
        .overrideTemplate(ExpenseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpenseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpenseService);
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