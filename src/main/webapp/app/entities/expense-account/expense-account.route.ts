import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseAccount } from 'app/shared/model/expense-account.model';
import { ExpenseAccountService } from './expense-account.service';
import { ExpenseAccountComponent } from './expense-account.component';
import { ExpenseAccountDetailComponent } from './expense-account-detail.component';
import { ExpenseAccountUpdateComponent } from './expense-account-update.component';
import { IExpenseAccount } from 'app/shared/model/expense-account.model';

@Injectable({ providedIn: 'root' })
export class ExpenseAccountResolve implements Resolve<IExpenseAccount> {
  constructor(private service: ExpenseAccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpenseAccount> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((expenseAccount: HttpResponse<ExpenseAccount>) => expenseAccount.body));
    }
    return of(new ExpenseAccount());
  }
}

export const expenseAccountRoute: Routes = [
  {
    path: '',
    component: ExpenseAccountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpenseAccountDetailComponent,
    resolve: {
      expenseAccount: ExpenseAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpenseAccountUpdateComponent,
    resolve: {
      expenseAccount: ExpenseAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccounts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpenseAccountUpdateComponent,
    resolve: {
      expenseAccount: ExpenseAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExpenseAccounts'
    },
    canActivate: [UserRouteAccessService]
  }
];
