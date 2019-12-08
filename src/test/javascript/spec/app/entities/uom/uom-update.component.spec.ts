import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { UOMUpdateComponent } from 'app/entities/uom/uom-update.component';
import { UOMService } from 'app/entities/uom/uom.service';
import { UOM } from 'app/shared/model/uom.model';

describe('Component Tests', () => {
  describe('UOM Management Update Component', () => {
    let comp: UOMUpdateComponent;
    let fixture: ComponentFixture<UOMUpdateComponent>;
    let service: UOMService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [UOMUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UOMUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UOMUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UOMService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UOM(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UOM();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
