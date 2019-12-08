import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { UserGroupDeleteDialogComponent } from 'app/entities/user-group/user-group-delete-dialog.component';
import { UserGroupService } from 'app/entities/user-group/user-group.service';

describe('Component Tests', () => {
  describe('UserGroup Management Delete Component', () => {
    let comp: UserGroupDeleteDialogComponent;
    let fixture: ComponentFixture<UserGroupDeleteDialogComponent>;
    let service: UserGroupService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [UserGroupDeleteDialogComponent]
      })
        .overrideTemplate(UserGroupDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserGroupDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserGroupService);
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
