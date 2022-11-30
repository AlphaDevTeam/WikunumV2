import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierAccount } from 'app/shared/model/supplier-account.model';
import { SupplierAccountService } from './supplier-account.service';
import { SupplierAccountComponent } from './supplier-account.component';
import { SupplierAccountDetailComponent } from './supplier-account-detail.component';
import { SupplierAccountUpdateComponent } from './supplier-account-update.component';
import { ISupplierAccount } from 'app/shared/model/supplier-account.model';

@Injectable({ providedIn: 'root' })
export class SupplierAccountResolve implements Resolve<ISupplierAccount> {
  constructor(private service: SupplierAccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierAccount> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((supplierAccount: HttpResponse<SupplierAccount>) => supplierAccount.body));
    }
    return of(new SupplierAccount());
  }
}

export const supplierAccountRoute: Routes = [
  {
    path: '',
    component: SupplierAccountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SupplierAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplierAccountDetailComponent,
    resolve: {
      supplierAccount: SupplierAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SupplierAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplierAccountUpdateComponent,
    resolve: {
      supplierAccount: SupplierAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SupplierAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplierAccountUpdateComponent,
    resolve: {
      supplierAccount: SupplierAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SupplierAccounts'
    },
    canActivate: [UserRouteAccessService]
  }
];
