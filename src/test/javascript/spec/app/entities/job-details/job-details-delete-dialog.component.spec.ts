import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { JobDetailsDeleteDialogComponent } from 'app/entities/job-details/job-details-delete-dialog.component';
import { JobDetailsService } from 'app/entities/job-details/job-details.service';

describe('Component Tests', () => {
  describe('JobDetails Management Delete Component', () => {
    let comp: JobDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<JobDetailsDeleteDialogComponent>;
    let service: JobDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [JobDetailsDeleteDialogComponent]
      })
        .overrideTemplate(JobDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobDetailsService);
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
