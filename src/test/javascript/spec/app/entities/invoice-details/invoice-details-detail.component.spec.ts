import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { InvoiceDetailsDetailComponent } from 'app/entities/invoice-details/invoice-details-detail.component';
import { InvoiceDetails } from 'app/shared/model/invoice-details.model';

describe('Component Tests', () => {
  describe('InvoiceDetails Management Detail Component', () => {
    let comp: InvoiceDetailsDetailComponent;
    let fixture: ComponentFixture<InvoiceDetailsDetailComponent>;
    const route = ({ data: of({ invoiceDetails: new InvoiceDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [InvoiceDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InvoiceDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.invoiceDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
