import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICashPaymentVoucherSupplier } from 'app/shared/model/cash-payment-voucher-supplier.model';

type EntityResponseType = HttpResponse<ICashPaymentVoucherSupplier>;
type EntityArrayResponseType = HttpResponse<ICashPaymentVoucherSupplier[]>;

@Injectable({ providedIn: 'root' })
export class CashPaymentVoucherSupplierService {
  public resourceUrl = SERVER_API_URL + 'api/cash-payment-voucher-suppliers';

  constructor(protected http: HttpClient) {}

  create(cashPaymentVoucherSupplier: ICashPaymentVoucherSupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cashPaymentVoucherSupplier);
    return this.http
      .post<ICashPaymentVoucherSupplier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cashPaymentVoucherSupplier: ICashPaymentVoucherSupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cashPaymentVoucherSupplier);
    return this.http
      .put<ICashPaymentVoucherSupplier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICashPaymentVoucherSupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICashPaymentVoucherSupplier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cashPaymentVoucherSupplier: ICashPaymentVoucherSupplier): ICashPaymentVoucherSupplier {
    const copy: ICashPaymentVoucherSupplier = Object.assign({}, cashPaymentVoucherSupplier, {
      transactionDate:
        cashPaymentVoucherSupplier.transactionDate != null && cashPaymentVoucherSupplier.transactionDate.isValid()
          ? cashPaymentVoucherSupplier.transactionDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.transactionDate = res.body.transactionDate != null ? moment(res.body.transactionDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cashPaymentVoucherSupplier: ICashPaymentVoucherSupplier) => {
        cashPaymentVoucherSupplier.transactionDate =
          cashPaymentVoucherSupplier.transactionDate != null ? moment(cashPaymentVoucherSupplier.transactionDate) : null;
      });
    }
    return res;
  }
}
