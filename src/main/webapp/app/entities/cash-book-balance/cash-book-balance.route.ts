import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CashBookBalance } from 'app/shared/model/cash-book-balance.model';
import { CashBookBalanceService } from './cash-book-balance.service';
import { CashBookBalanceComponent } from './cash-book-balance.component';
import { CashBookBalanceDetailComponent } from './cash-book-balance-detail.component';
import { CashBookBalanceUpdateComponent } from './cash-book-balance-update.component';
import { ICashBookBalance } from 'app/shared/model/cash-book-balance.model';

@Injectable({ providedIn: 'root' })
export class CashBookBalanceResolve implements Resolve<ICashBookBalance> {
  constructor(private service: CashBookBalanceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICashBookBalance> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((cashBookBalance: HttpResponse<CashBookBalance>) => cashBookBalance.body));
    }
    return of(new CashBookBalance());
  }
}

export const cashBookBalanceRoute: Routes = [
  {
    path: '',
    component: CashBookBalanceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashBookBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CashBookBalanceDetailComponent,
    resolve: {
      cashBookBalance: CashBookBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashBookBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CashBookBalanceUpdateComponent,
    resolve: {
      cashBookBalance: CashBookBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashBookBalances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CashBookBalanceUpdateComponent,
    resolve: {
      cashBookBalance: CashBookBalanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CashBookBalances'
    },
    canActivate: [UserRouteAccessService]
  }
];
