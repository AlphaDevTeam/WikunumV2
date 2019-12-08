import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { ChangeLogDeleteDialogComponent } from 'app/entities/change-log/change-log-delete-dialog.component';
import { ChangeLogService } from 'app/entities/change-log/change-log.service';

describe('Component Tests', () => {
  describe('ChangeLog Management Delete Component', () => {
    let comp: ChangeLogDeleteDialogComponent;
    let fixture: ComponentFixture<ChangeLogDeleteDialogComponent>;
    let service: ChangeLogService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ChangeLogDeleteDialogComponent]
      })
        .overrideTemplate(ChangeLogDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChangeLogDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChangeLogService);
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
