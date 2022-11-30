import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { UOMDetailComponent } from 'app/entities/uom/uom-detail.component';
import { UOM } from 'app/shared/model/uom.model';

describe('Component Tests', () => {
  describe('UOM Management Detail Component', () => {
    let comp: UOMDetailComponent;
    let fixture: ComponentFixture<UOMDetailComponent>;
    const route = ({ data: of({ uOM: new UOM(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [UOMDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UOMDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UOMDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uOM).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
