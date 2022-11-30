import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashPaymentVoucherExpense } from 'app/shared/model/cash-payment-voucher-expense.model';
import { CashPaymentVoucherExpenseService } from './cash-payment-voucher-expense.service';
import { CashPaymentVoucherExpenseComponent } from './cash-payment-voucher-expense.component';
import { CashPaymentVoucherExpenseDetailComponent } from './cash-payment-voucher-expense-detail.component';
import { CashPaymentVoucherExpenseUpdateComponent } from './cash-payment-voucher-expense-update.component';
import { ICashPaymentVoucherExpense } from 'app/shared/model/cash-payment-voucher-expense.model';

@Injectable({ providedIn: 'root' })
export class CashPaymentVoucherExpenseResolve implements Resolve<ICashPaymentVoucherExpense> {
  constructor(private service: CashPaymentVoucherExpenseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashPaymentVoucherExpense> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((cashPaymentVoucherExpense: HttpResponse<CashPaymentVoucherExpense>) => cashPaymentVoucherExpense.body));
    }
    return of(new CashPaymentVoucherExpense());
  }
}

export const cashPaymentVoucherExpenseRoute: Routes = [
  {
    path: '',
    component: CashPaymentVoucherExpenseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashPaymentVoucherExpenseDetailComponent,
    resolve: {
      cashPaymentVoucherExpense: CashPaymentVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashPaymentVoucherExpenseUpdateComponent,
    resolve: {
      cashPaymentVoucherExpense: CashPaymentVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashPaymentVoucherExpenseUpdateComponent,
    resolve: {
      cashPaymentVoucherExpense: CashPaymentVoucherExpenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashPaymentVoucherExpenses'
    },
    canActivate: [UserRouteAccessService]
  }
];
