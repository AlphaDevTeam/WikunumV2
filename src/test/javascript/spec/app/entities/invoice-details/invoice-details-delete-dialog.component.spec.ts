import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WikunumV2TestModule } from '../../../test.module';
import { InvoiceDetailsDeleteDialogComponent } from 'app/entities/invoice-details/invoice-details-delete-dialog.component';
import { InvoiceDetailsService } from 'app/entities/invoice-details/invoice-details.service';

describe('Component Tests', () => {
  describe('InvoiceDetails Management Delete Component', () => {
    let comp: InvoiceDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<InvoiceDetailsDeleteDialogComponent>;
    let service: InvoiceDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [InvoiceDetailsDeleteDialogComponent]
      })
        .overrideTemplate(InvoiceDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceDetailsService);
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
