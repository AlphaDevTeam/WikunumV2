import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentNumberConfig } from 'app/shared/model/document-number-config.model';

@Component({
  selector: 'jhi-document-number-config-detail',
  templateUrl: './document-number-config-detail.component.html'
})
export class DocumentNumberConfigDetailComponent implements OnInit {
  documentNumberConfig: IDocumentNumberConfig;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentNumberConfig }) => {
      this.documentNumberConfig = documentNumberConfig;
    });
  }

  previousState() {
    window.history.back();
  }
}
