import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItems } from 'app/shared/model/menu-items.model';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsComponent } from './menu-items.component';
import { MenuItemsDetailComponent } from './menu-items-detail.component';
import { MenuItemsUpdateComponent } from './menu-items-update.component';
import { IMenuItems } from 'app/shared/model/menu-items.model';

@Injectable({ providedIn: 'root' })
export class MenuItemsResolve implements Resolve<IMenuItems> {
  constructor(private service: MenuItemsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuItems> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((menuItems: HttpResponse<MenuItems>) => menuItems.body));
    }
    return of(new MenuItems());
  }
}

export const menuItemsRoute: Routes = [
  {
    path: '',
    component: MenuItemsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MenuItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MenuItemsDetailComponent,
    resolve: {
      menuItems: MenuItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MenuItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MenuItemsUpdateComponent,
    resolve: {
      menuItems: MenuItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MenuItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MenuItemsUpdateComponent,
    resolve: {
      menuItems: MenuItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MenuItems'
    },
    canActivate: [UserRouteAccessService]
  }
];
