import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { MenuItemsDeleteDialogComponent } from 'app/entities/menu-items/menu-items-delete-dialog.component';
import { MenuItemsService } from 'app/entities/menu-items/menu-items.service';

describe('Component Tests', () => {
  describe('MenuItems Management Delete Component', () => {
    let comp: MenuItemsDeleteDialogComponent;
    let fixture: ComponentFixture<MenuItemsDeleteDialogComponent>;
    let service: MenuItemsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [MenuItemsDeleteDialogComponent]
      })
        .overrideTemplate(MenuItemsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuItemsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuItemsService);
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
