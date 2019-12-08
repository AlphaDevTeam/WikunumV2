import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';
import { CashReceiptVoucherExpenseService } from './cash-receipt-voucher-expense.service';
import { CashReceiptVoucherExpenseComponent } from './cash-receipt-voucher-expense.component';
import { CashReceiptVoucherExpenseDetailComponent } from './cash-receipt-voucher-expense-detail.component';
import { CashReceiptVoucherExpenseUpdateComponent } from './cash-receipt-voucher-expense-update.component';
import { ICashReceiptVoucherExpense } from 'app/shared/model/cash-receipt-voucher-expense.model';

@Injectable({ providedIn: 'root' })
export class CashReceiptVoucherExpenseResolve implements Resolve<ICashReceiptVoucherExpense> {
  constructor(private service: CashReceiptVoucherExpenseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashReceiptVoucherExpense> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashReceiptVoucherExpense: HttpResponse<CashReceiptVoucherExpense>) => cashReceiptVoucherExpense.body));
    }
    return of(new CashReceiptVoucherExpense());
  }
}

export const cashReceiptVoucherExpenseRoute: Routes = [
  {
    path: '',
    component: CashReceiptVoucherExpenseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashReceiptVoucherExpenseDetailComponent,
    resolve: {
      cashReceiptVoucherExpense: CashReceiptVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashReceiptVoucherExpenseUpdateComponent,
    resolve: {
      cashReceiptVoucherExpense: CashReceiptVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashReceiptVoucherExpenseUpdateComponent,
    resolve: {
      cashReceiptVoucherExpense: CashReceiptVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashReceiptVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  }
];
