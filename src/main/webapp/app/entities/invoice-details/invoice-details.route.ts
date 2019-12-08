import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceDetails } from 'app/shared/model/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsDetailComponent } from './invoice-details-detail.component';
import { InvoiceDetailsUpdateComponent } from './invoice-details-update.component';
import { IInvoiceDetails } from 'app/shared/model/invoice-details.model';

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsResolve implements Resolve<IInvoiceDetails> {
  constructor(private service: InvoiceDetailsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoiceDetails> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((invoiceDetails: HttpResponse<InvoiceDetails>) => invoiceDetails.body));
    }
    return of(new InvoiceDetails());
  }
}

export const invoiceDetailsRoute: Routes = [
  {
    path: '',
    component: InvoiceDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'InvoiceDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InvoiceDetailsDetailComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'InvoiceDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InvoiceDetailsUpdateComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'InvoiceDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InvoiceDetailsUpdateComponent,
    resolve: {
      invoiceDetails: InvoiceDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'InvoiceDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];
