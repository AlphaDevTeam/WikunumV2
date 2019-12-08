import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { ItemAddOnsDeleteDialogComponent } from 'app/entities/item-add-ons/item-add-ons-delete-dialog.component';
import { ItemAddOnsService } from 'app/entities/item-add-ons/item-add-ons.service';

describe('Component Tests', () => {
  describe('ItemAddOns Management Delete Component', () => {
    let comp: ItemAddOnsDeleteDialogComponent;
    let fixture: ComponentFixture<ItemAddOnsDeleteDialogComponent>;
    let service: ItemAddOnsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ItemAddOnsDeleteDialogComponent]
      })
        .overrideTemplate(ItemAddOnsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemAddOnsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemAddOnsService);
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
