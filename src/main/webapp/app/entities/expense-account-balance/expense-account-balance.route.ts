import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';
import { ExpenseAccountBalanceService } from './expense-account-balance.service';
import { ExpenseAccountBalanceComponent } from './expense-account-balance.component';
import { ExpenseAccountBalanceDetailComponent } from './expense-account-balance-detail.component';
import { ExpenseAccountBalanceUpdateComponent } from './expense-account-balance-update.component';
import { IExpenseAccountBalance } from 'app/shared/model/expense-account-balance.model';

@Injectable({ providedIn: 'root' })
export class ExpenseAccountBalanceResolve implements Resolve<IExpenseAccountBalance> {
  constructor(private service: ExpenseAccountBalanceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpenseAccountBalance> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((expenseAccountBalance: HttpResponse<ExpenseAccountBalance>) => expenseAccountBalance.body));
    }
    return of(new ExpenseAccountBalance());
  }
}

export const expenseAccountBalanceRoute: Routes = [
  {
    path: '',
    component: ExpenseAccountBalanceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccountBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpenseAccountBalanceDetailComponent,
    resolve: {
      expenseAccountBalance: ExpenseAccountBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccountBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpenseAccountBalanceUpdateComponent,
    resolve: {
      expenseAccountBalance: ExpenseAccountBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccountBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpenseAccountBalanceUpdateComponent,
    resolve: {
      expenseAccountBalance: ExpenseAccountBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccountBalances'
    },
    canActivate: [UserRouteAccessService]
  }
];
