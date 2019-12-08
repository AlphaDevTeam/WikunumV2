import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { DocumentHistoryDeleteDialogComponent } from 'app/entities/document-history/document-history-delete-dialog.component';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

describe('Component Tests', () => {
  describe('DocumentHistory Management Delete Component', () => {
    let comp: DocumentHistoryDeleteDialogComponent;
    let fixture: ComponentFixture<DocumentHistoryDeleteDialogComponent>;
    let service: DocumentHistoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [DocumentHistoryDeleteDialogComponent]
      })
        .overrideTemplate(DocumentHistoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentHistoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentHistoryService);
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
