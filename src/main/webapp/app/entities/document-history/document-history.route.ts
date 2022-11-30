import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from './document-history.service';
import { DocumentHistoryComponent } from './document-history.component';
import { DocumentHistoryDetailComponent } from './document-history-detail.component';
import { DocumentHistoryUpdateComponent } from './document-history-update.component';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

@Injectable({ providedIn: 'root' })
export class DocumentHistoryResolve implements Resolve<IDocumentHistory> {
  constructor(private service: DocumentHistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentHistory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((documentHistory: HttpResponse<DocumentHistory>) => documentHistory.body));
    }
    return of(new DocumentHistory());
  }
}

export const documentHistoryRoute: Routes = [
  {
    path: '',
    component: DocumentHistoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentHistoryDetailComponent,
    resolve: {
      documentHistory: DocumentHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentHistoryUpdateComponent,
    resolve: {
      documentHistory: DocumentHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentHistoryUpdateComponent,
    resolve: {
      documentHistory: DocumentHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];
