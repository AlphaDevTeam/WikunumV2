import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { SalesAccountDeleteDialogComponent } from 'app/entities/sales-account/sales-account-delete-dialog.component';
import { SalesAccountService } from 'app/entities/sales-account/sales-account.service';

describe('Component Tests', () => {
  describe('SalesAccount Management Delete Component', () => {
    let comp: SalesAccountDeleteDialogComponent;
    let fixture: ComponentFixture<SalesAccountDeleteDialogComponent>;
    let service: SalesAccountService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [SalesAccountDeleteDialogComponent]
      })
        .overrideTemplate(SalesAccountDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SalesAccountDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SalesAccountService);
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
