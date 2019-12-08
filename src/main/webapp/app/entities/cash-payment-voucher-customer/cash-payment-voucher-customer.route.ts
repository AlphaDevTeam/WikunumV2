import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashPaymentVoucherCustomer } from 'app/shared/model/cash-payment-voucher-customer.model';
import { CashPaymentVoucherCustomerService } from './cash-payment-voucher-customer.service';
import { CashPaymentVoucherCustomerComponent } from './cash-payment-voucher-customer.component';
import { CashPaymentVoucherCustomerDetailComponent } from './cash-payment-voucher-customer-detail.component';
import { CashPaymentVoucherCustomerUpdateComponent } from './cash-payment-voucher-customer-update.component';
import { ICashPaymentVoucherCustomer } from 'app/shared/model/cash-payment-voucher-customer.model';

@Injectable({ providedIn: 'root' })
export class CashPaymentVoucherCustomerResolve implements Resolve<ICashPaymentVoucherCustomer> {
  constructor(private service: CashPaymentVoucherCustomerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashPaymentVoucherCustomer> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashPaymentVoucherCustomer: HttpResponse<CashPaymentVoucherCustomer>) => cashPaymentVoucherCustomer.body));
    }
    return of(new CashPaymentVoucherCustomer());
  }
}

export const cashPaymentVoucherCustomerRoute: Routes = [
  {
    path: '',
    component: CashPaymentVoucherCustomerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashPaymentVoucherCustomerDetailComponent,
    resolve: {
      cashPaymentVoucherCustomer: CashPaymentVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashPaymentVoucherCustomerUpdateComponent,
    resolve: {
      cashPaymentVoucherCustomer: CashPaymentVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashPaymentVoucherCustomerUpdateComponent,
    resolve: {
      cashPaymentVoucherCustomer: CashPaymentVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  }
];
