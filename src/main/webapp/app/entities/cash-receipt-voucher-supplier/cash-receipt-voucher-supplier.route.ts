import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';
import { CashReceiptVoucherSupplierService } from './cash-receipt-voucher-supplier.service';
import { CashReceiptVoucherSupplierComponent } from './cash-receipt-voucher-supplier.component';
import { CashReceiptVoucherSupplierDetailComponent } from './cash-receipt-voucher-supplier-detail.component';
import { CashReceiptVoucherSupplierUpdateComponent } from './cash-receipt-voucher-supplier-update.component';
import { ICashReceiptVoucherSupplier } from 'app/shared/model/cash-receipt-voucher-supplier.model';

@Injectable({ providedIn: 'root' })
export class CashReceiptVoucherSupplierResolve implements Resolve<ICashReceiptVoucherSupplier> {
  constructor(private service: CashReceiptVoucherSupplierService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashReceiptVoucherSupplier> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashReceiptVoucherSupplier: HttpResponse<CashReceiptVoucherSupplier>) => cashReceiptVoucherSupplier.body));
    }
    return of(new CashReceiptVoucherSupplier());
  }
}

export const cashReceiptVoucherSupplierRoute: Routes = [
  {
    path: '',
    component: CashReceiptVoucherSupplierComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashReceiptVoucherSupplierDetailComponent,
    resolve: {
      cashReceiptVoucherSupplier: CashReceiptVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashReceiptVoucherSupplierUpdateComponent,
    resolve: {
      cashReceiptVoucherSupplier: CashReceiptVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashReceiptVoucherSupplierUpdateComponent,
    resolve: {
      cashReceiptVoucherSupplier: CashReceiptVoucherSupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherSuppliers'
    },
    canActivate: [UserRouteAccessService]
  }
];
