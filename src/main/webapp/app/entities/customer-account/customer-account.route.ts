import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerAccount } from 'app/shared/model/customer-account.model';
import { CustomerAccountService } from './customer-account.service';
import { CustomerAccountComponent } from './customer-account.component';
import { CustomerAccountDetailComponent } from './customer-account-detail.component';
import { CustomerAccountUpdateComponent } from './customer-account-update.component';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';

@Injectable({ providedIn: 'root' })
export class CustomerAccountResolve implements Resolve<ICustomerAccount> {
  constructor(private service: CustomerAccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerAccount> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((customerAccount: HttpResponse<CustomerAccount>) => customerAccount.body));
    }
    return of(new CustomerAccount());
  }
}

export const customerAccountRoute: Routes = [
  {
    path: '',
    component: CustomerAccountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomerAccountDetailComponent,
    resolve: {
      customerAccount: CustomerAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomerAccountUpdateComponent,
    resolve: {
      customerAccount: CustomerAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomerAccountUpdateComponent,
    resolve: {
      customerAccount: CustomerAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerAccounts'
    },
    canActivate: [UserRouteAccessService]
  }
];
