import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobStatus } from 'app/shared/model/job-status.model';
import { JobStatusService } from './job-status.service';
import { JobStatusComponent } from './job-status.component';
import { JobStatusDetailComponent } from './job-status-detail.component';
import { JobStatusUpdateComponent } from './job-status-update.component';
import { IJobStatus } from 'app/shared/model/job-status.model';

@Injectable({ providedIn: 'root' })
export class JobStatusResolve implements Resolve<IJobStatus> {
  constructor(private service: JobStatusService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobStatus> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((jobStatus: HttpResponse<JobStatus>) => jobStatus.body));
    }
    return of(new JobStatus());
  }
}

export const jobStatusRoute: Routes = [
  {
    path: '',
    component: JobStatusComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobStatuses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobStatusDetailComponent,
    resolve: {
      jobStatus: JobStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobStatuses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobStatusUpdateComponent,
    resolve: {
      jobStatus: JobStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobStatuses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobStatusUpdateComponent,
    resolve: {
      jobStatus: JobStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobStatuses'
    },
    canActivate: [UserRouteAccessService]
  }
];
