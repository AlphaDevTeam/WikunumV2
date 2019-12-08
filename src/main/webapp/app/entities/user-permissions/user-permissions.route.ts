import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsComponent } from './user-permissions.component';
import { UserPermissionsDetailComponent } from './user-permissions-detail.component';
import { UserPermissionsUpdateComponent } from './user-permissions-update.component';
import { IUserPermissions } from 'app/shared/model/user-permissions.model';

@Injectable({ providedIn: 'root' })
export class UserPermissionsResolve implements Resolve<IUserPermissions> {
  constructor(private service: UserPermissionsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserPermissions> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userPermissions: HttpResponse<UserPermissions>) => userPermissions.body));
    }
    return of(new UserPermissions());
  }
}

export const userPermissionsRoute: Routes = [
  {
    path: '',
    component: UserPermissionsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserPermissionsDetailComponent,
    resolve: {
      userPermissions: UserPermissionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserPermissionsUpdateComponent,
    resolve: {
      userPermissions: UserPermissionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserPermissionsUpdateComponent,
    resolve: {
      userPermissions: UserPermissionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserPermissions'
    },
    canActivate: [UserRouteAccessService]
  }
];
