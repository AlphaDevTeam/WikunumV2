import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeLog } from 'app/shared/model/change-log.model';
import { ChangeLogService } from './change-log.service';
import { ChangeLogComponent } from './change-log.component';
import { ChangeLogDetailComponent } from './change-log-detail.component';
import { ChangeLogUpdateComponent } from './change-log-update.component';
import { IChangeLog } from 'app/shared/model/change-log.model';

@Injectable({ providedIn: 'root' })
export class ChangeLogResolve implements Resolve<IChangeLog> {
  constructor(private service: ChangeLogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChangeLog> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((changeLog: HttpResponse<ChangeLog>) => changeLog.body));
    }
    return of(new ChangeLog());
  }
}

export const changeLogRoute: Routes = [
  {
    path: '',
    component: ChangeLogComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChangeLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChangeLogDetailComponent,
    resolve: {
      changeLog: ChangeLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChangeLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChangeLogUpdateComponent,
    resolve: {
      changeLog: ChangeLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChangeLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChangeLogUpdateComponent,
    resolve: {
      changeLog: ChangeLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChangeLogs'
    },
    canActivate: [UserRouteAccessService]
  }
];
