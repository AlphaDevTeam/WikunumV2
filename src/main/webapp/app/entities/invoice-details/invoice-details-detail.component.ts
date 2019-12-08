import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceDetails } from 'app/shared/model/invoice-details.model';

@Component({
  selector: 'jhi-invoice-details-detail',
  templateUrl: './invoice-details-detail.component.html'
})
export class InvoiceDetailsDetailComponent implements OnInit {
  invoiceDetails: IInvoiceDetails;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ invoiceDetails }) => {
      this.invoiceDetails = invoiceDetails;
    });
  }

  previousState() {
    window.history.back();
  }
}
