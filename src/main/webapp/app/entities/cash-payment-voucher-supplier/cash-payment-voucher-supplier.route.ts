import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashPaymentVoucherSupplier } from 'app/shared/model/cash-payment-voucher-supplier.model';
import { CashPaymentVoucherSupplierService } from './cash-payment-voucher-supplier.service';
import { CashPaymentVoucherSupplierComponent } from './cash-payment-voucher-supplier.component';
import { CashPaymentVoucherSupplierDetailComponent } from './cash-payment-voucher-supplier-detail.component';
import { CashPaymentVoucherSupplierUpdateComponent } from './cash-payment-voucher-supplier-update.component';
import { ICashPaymentVoucherSupplier } from 'app/shared/model/cash-payment-voucher-supplier.model';

@Injectable({ providedIn: 'root' })
export class CashPaymentVoucherSupplierResolve implements Resolve<ICashPaymentVoucherSupplier> {
  constructor(private service: CashPaymentVoucherSupplierService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashPaymentVoucherSupplier> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashPaymentVoucherSupplier: HttpResponse<CashPaymentVoucherSupplier>) => cashPaymentVoucherSupplier.body));
    }
    return of(new CashPaymentVoucherSupplier());
  }
}

export const cashPaymentVoucherSupplierRoute: Routes = [
  {
    path: '',
    component: CashPaymentVoucherSupplierComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashPaymentVoucherSupplierDetailComponent,
    resolve: {
      cashPaymentVoucherSupplier: CashPaymentVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashPaymentVoucherSupplierUpdateComponent,
    resolve: {
      cashPaymentVoucherSupplier: CashPaymentVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashPaymentVoucherSupplierUpdateComponent,
    resolve: {
      cashPaymentVoucherSupplier: CashPaymentVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  }
];
