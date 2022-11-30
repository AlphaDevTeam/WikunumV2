import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';
import { CashReceiptVoucherCustomerService } from './cash-receipt-voucher-customer.service';
import { CashReceiptVoucherCustomerComponent } from './cash-receipt-voucher-customer.component';
import { CashReceiptVoucherCustomerDetailComponent } from './cash-receipt-voucher-customer-detail.component';
import { CashReceiptVoucherCustomerUpdateComponent } from './cash-receipt-voucher-customer-update.component';
import { ICashReceiptVoucherCustomer } from 'app/shared/model/cash-receipt-voucher-customer.model';

@Injectable({ providedIn: 'root' })
export class CashReceiptVoucherCustomerResolve implements Resolve<ICashReceiptVoucherCustomer> {
  constructor(private service: CashReceiptVoucherCustomerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashReceiptVoucherCustomer> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashReceiptVoucherCustomer: HttpResponse<CashReceiptVoucherCustomer>) => cashReceiptVoucherCustomer.body));
    }
    return of(new CashReceiptVoucherCustomer());
  }
}

export const cashReceiptVoucherCustomerRoute: Routes = [
  {
    path: '',
    component: CashReceiptVoucherCustomerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashReceiptVoucherCustomerDetailComponent,
    resolve: {
      cashReceiptVoucherCustomer: CashReceiptVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashReceiptVoucherCustomerUpdateComponent,
    resolve: {
      cashReceiptVoucherCustomer: CashReceiptVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashReceiptVoucherCustomerUpdateComponent,
    resolve: {
      cashReceiptVoucherCustomer: CashReceiptVoucherCustomerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherCustomers'
    },
    canActivate: [UserRouteAccessService]
  }
];
