import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { UserPermissionsDeleteDialogComponent } from 'app/entities/user-permissions/user-permissions-delete-dialog.component';
import { UserPermissionsService } from 'app/entities/user-permissions/user-permissions.service';

describe('Component Tests', () => {
  describe('UserPermissions Management Delete Component', () => {
    let comp: UserPermissionsDeleteDialogComponent;
    let fixture: ComponentFixture<UserPermissionsDeleteDialogComponent>;
    let service: UserPermissionsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [UserPermissionsDeleteDialogComponent]
      })
        .overrideTemplate(UserPermissionsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserPermissionsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserPermissionsService);
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
