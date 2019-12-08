import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WikunumV2TestModule } from '../../../test.module';
import { UserGroupDetailComponent } from 'app/entities/user-group/user-group-detail.component';
import { UserGroup } from 'app/shared/model/user-group.model';

describe('Component Tests', () => {
  describe('UserGroup Management Detail Component', () => {
    let comp: UserGroupDetailComponent;
    let fixture: ComponentFixture<UserGroupDetailComponent>;
    const route = ({ data: of({ userGroup: new UserGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WikunumV2TestModule],
        declarations: [UserGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
