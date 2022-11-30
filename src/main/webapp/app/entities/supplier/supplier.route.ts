import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { SupplierComponent } from './supplier.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierUpdateComponent } from './supplier-update.component';
import { ISupplier } from 'app/shared/model/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierResolve implements Resolve<ISupplier> {
  constructor(private service: SupplierService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplier> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((supplier: HttpResponse<Supplier>) => supplier.body));
    }
    return of(new Supplier());
  }
}

export const supplierRoute: Routes = [
  {
    path: '',
    component: SupplierComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Suppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplierDetailComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Suppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplierUpdateComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Suppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplierUpdateComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Suppliers'
    },
    canActivate: [UserRouteAccessService]
  }
];
