import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { CashBookBalanceDeleteDialogComponent } from 'app/entities/cash-book-balance/cash-book-balance-delete-dialog.component';
import { CashBookBalanceService } from 'app/entities/cash-book-balance/cash-book-balance.service';

describe('Component Tests', () => {
  describe('CashBookBalance Management Delete Component', () => {
    let comp: CashBookBalanceDeleteDialogComponent;
    let fixture: ComponentFixture<CashBookBalanceDeleteDialogComponent>;
    let service: CashBookBalanceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [CashBookBalanceDeleteDialogComponent]
      })
        .overrideTemplate(CashBookBalanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CashBookBalanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CashBookBalanceService);
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
