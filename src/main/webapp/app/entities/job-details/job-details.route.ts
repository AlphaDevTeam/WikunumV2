import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobDetails } from 'app/shared/model/job-details.model';
import { JobDetailsService } from './job-details.service';
import { JobDetailsComponent } from './job-details.component';
import { JobDetailsDetailComponent } from './job-details-detail.component';
import { JobDetailsUpdateComponent } from './job-details-update.component';
import { IJobDetails } from 'app/shared/model/job-details.model';

@Injectable({ providedIn: 'root' })
export class JobDetailsResolve implements Resolve<IJobDetails> {
  constructor(private service: JobDetailsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobDetails> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((jobDetails: HttpResponse<JobDetails>) => jobDetails.body));
    }
    return of(new JobDetails());
  }
}

export const jobDetailsRoute: Routes = [
  {
    path: '',
    component: JobDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobDetailsDetailComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobDetailsUpdateComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobDetailsUpdateComponent,
    resolve: {
      jobDetails: JobDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];
