import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { DocumentNumberConfigDeleteDialogComponent } from 'app/entities/document-number-config/document-number-config-delete-dialog.component';
import { DocumentNumberConfigService } from 'app/entities/document-number-config/document-number-config.service';

describe('Component Tests', () => {
  describe('DocumentNumberConfig Management Delete Component', () => {
    let comp: DocumentNumberConfigDeleteDialogComponent;
    let fixture: ComponentFixture<DocumentNumberConfigDeleteDialogComponent>;
    let service: DocumentNumberConfigService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [DocumentNumberConfigDeleteDialogComponent]
      })
        .overrideTemplate(DocumentNumberConfigDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentNumberConfigDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentNumberConfigService);
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
