import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemAddOns } from 'app/shared/model/item-add-ons.model';
import { ItemAddOnsService } from './item-add-ons.service';
import { ItemAddOnsComponent } from './item-add-ons.component';
import { ItemAddOnsDetailComponent } from './item-add-ons-detail.component';
import { ItemAddOnsUpdateComponent } from './item-add-ons-update.component';
import { IItemAddOns } from 'app/shared/model/item-add-ons.model';

@Injectable({ providedIn: 'root' })
export class ItemAddOnsResolve implements Resolve<IItemAddOns> {
  constructor(private service: ItemAddOnsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemAddOns> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((itemAddOns: HttpResponse<ItemAddOns>) => itemAddOns.body));
    }
    return of(new ItemAddOns());
  }
}

export const itemAddOnsRoute: Routes = [
  {
    path: '',
    component: ItemAddOnsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemAddOns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemAddOnsDetailComponent,
    resolve: {
      itemAddOns: ItemAddOnsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemAddOns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemAddOnsUpdateComponent,
    resolve: {
      itemAddOns: ItemAddOnsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemAddOns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemAddOnsUpdateComponent,
    resolve: {
      itemAddOns: ItemAddOnsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemAddOns'
    },
    canActivate: [UserRouteAccessService]
  }
];
