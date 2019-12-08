import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { ItemAddOnsDetailComponent } from 'app/entities/item-add-ons/item-add-ons-detail.component';
import { ItemAddOns } from 'app/shared/model/item-add-ons.model';

describe('Component Tests', () => {
  describe('ItemAddOns Management Detail Component', () => {
    let comp: ItemAddOnsDetailComponent;
    let fixture: ComponentFixture<ItemAddOnsDetailComponent>;
    const route = ({ data: of({ itemAddOns: new ItemAddOns(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [ItemAddOnsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemAddOnsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemAddOnsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemAddOns).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
