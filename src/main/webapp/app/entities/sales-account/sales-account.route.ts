import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesAccount } from 'app/shared/model/sales-account.model';
import { SalesAccountService } from './sales-account.service';
import { SalesAccountComponent } from './sales-account.component';
import { SalesAccountDetailComponent } from './sales-account-detail.component';
import { SalesAccountUpdateComponent } from './sales-account-update.component';
import { ISalesAccount } from 'app/shared/model/sales-account.model';

@Injectable({ providedIn: 'root' })
export class SalesAccountResolve implements Resolve<ISalesAccount> {
  constructor(private service: SalesAccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISalesAccount> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((salesAccount: HttpResponse<SalesAccount>) => salesAccount.body));
    }
    return of(new SalesAccount());
  }
}

export const salesAccountRoute: Routes = [
  {
    path: '',
    component: SalesAccountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SalesAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SalesAccountDetailComponent,
    resolve: {
      salesAccount: SalesAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SalesAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SalesAccountUpdateComponent,
    resolve: {
      salesAccount: SalesAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SalesAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SalesAccountUpdateComponent,
    resolve: {
      salesAccount: SalesAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SalesAccounts'
    },
    canActivate: [UserRouteAccessService]
  }
];
