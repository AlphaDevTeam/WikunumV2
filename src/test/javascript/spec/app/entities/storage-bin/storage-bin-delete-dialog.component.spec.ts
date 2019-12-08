import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { StorageBinDeleteDialogComponent } from 'app/entities/storage-bin/storage-bin-delete-dialog.component';
import { StorageBinService } from 'app/entities/storage-bin/storage-bin.service';

describe('Component Tests', () => {
  describe('StorageBin Management Delete Component', () => {
    let comp: StorageBinDeleteDialogComponent;
    let fixture: ComponentFixture<StorageBinDeleteDialogComponent>;
    let service: StorageBinService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [StorageBinDeleteDialogComponent]
      })
        .overrideTemplate(StorageBinDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StorageBinDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StorageBinService);
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
