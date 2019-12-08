import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { ExpenseAccountDeleteDialogComponent } from 'app/entities/expense-account/expense-account-delete-dialog.component';
import { ExpenseAccountService } from 'app/entities/expense-account/expense-account.service';

describe('Component Tests', () => {
  describe('ExpenseAccount Management Delete Component', () => {
    let comp: ExpenseAccountDeleteDialogComponent;
    let fixture: ComponentFixture<ExpenseAccountDeleteDialogComponent>;
    let service: ExpenseAccountService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ExpenseAccountDeleteDialogComponent]
      })
        .overrideTemplate(ExpenseAccountDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpenseAccountDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpenseAccountService);
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
