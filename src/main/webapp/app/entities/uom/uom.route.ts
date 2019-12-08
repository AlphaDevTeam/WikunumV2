import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UOM } from 'app/shared/model/uom.model';
import { UOMService } from './uom.service';
import { UOMComponent } from './uom.component';
import { UOMDetailComponent } from './uom-detail.component';
import { UOMUpdateComponent } from './uom-update.component';
import { IUOM } from 'app/shared/model/uom.model';

@Injectable({ providedIn: 'root' })
export class UOMResolve implements Resolve<IUOM> {
  constructor(private service: UOMService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUOM> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((uOM: HttpResponse<UOM>) => uOM.body));
    }
    return of(new UOM());
  }
}

export const uOMRoute: Routes = [
  {
    path: '',
    component: UOMComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UOMS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UOMDetailComponent,
    resolve: {
      uOM: UOMResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UOMS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UOMUpdateComponent,
    resolve: {
      uOM: UOMResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UOMS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UOMUpdateComponent,
    resolve: {
      uOM: UOMResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UOMS'
    },
    canActivate: [UserRouteAccessService]
  }
];
