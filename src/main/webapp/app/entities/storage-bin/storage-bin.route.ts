import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageBin } from 'app/shared/model/storage-bin.model';
import { StorageBinService } from './storage-bin.service';
import { StorageBinComponent } from './storage-bin.component';
import { StorageBinDetailComponent } from './storage-bin-detail.component';
import { StorageBinUpdateComponent } from './storage-bin-update.component';
import { IStorageBin } from 'app/shared/model/storage-bin.model';

@Injectable({ providedIn: 'root' })
export class StorageBinResolve implements Resolve<IStorageBin> {
  constructor(private service: StorageBinService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStorageBin> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((storageBin: HttpResponse<StorageBin>) => storageBin.body));
    }
    return of(new StorageBin());
  }
}

export const storageBinRoute: Routes = [
  {
    path: '',
    component: StorageBinComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StorageBins'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StorageBinDetailComponent,
    resolve: {
      storageBin: StorageBinResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StorageBins'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StorageBinUpdateComponent,
    resolve: {
      storageBin: StorageBinResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StorageBins'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StorageBinUpdateComponent,
    resolve: {
      storageBin: StorageBinResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StorageBins'
    },
    canActivate: [UserRouteAccessService]
  }
];
