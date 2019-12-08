import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { DocumentNumberConfigDetailComponent } from 'app/entities/document-number-config/document-number-config-detail.component';
import { DocumentNumberConfig } from 'app/shared/model/document-number-config.model';

describe('Component Tests', () => {
  describe('DocumentNumberConfig Management Detail Component', () => {
    let comp: DocumentNumberConfigDetailComponent;
    let fixture: ComponentFixture<DocumentNumberConfigDetailComponent>;
    const route = ({ data: of({ documentNumberConfig: new DocumentNumberConfig(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [DocumentNumberConfigDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentNumberConfigDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentNumberConfigDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentNumberConfig).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
