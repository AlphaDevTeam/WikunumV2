import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentNumberConfig } from 'app/shared/model/document-number-config.model';

type EntityResponseType = HttpResponse<IDocumentNumberConfig>;
type EntityArrayResponseType = HttpResponse<IDocumentNumberConfig[]>;

@Injectable({ providedIn: 'root' })
export class DocumentNumberConfigService {
  public resourceUrl = SERVER_API_URL + 'api/document-number-configs';

  constructor(protected http: HttpClient) {}

  create(documentNumberConfig: IDocumentNumberConfig): Observable<EntityResponseType> {
    return this.http.post<IDocumentNumberConfig>(this.resourceUrl, documentNumberConfig, { observe: 'response' });
  }

  update(documentNumberConfig: IDocumentNumberConfig): Observable<EntityResponseType> {
    return this.http.put<IDocumentNumberConfig>(this.resourceUrl, documentNumberConfig, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentNumberConfig>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentNumberConfig[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}