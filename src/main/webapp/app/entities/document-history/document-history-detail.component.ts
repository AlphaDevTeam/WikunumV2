import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentHistory } from 'app/shared/model/document-history.model';

@Component({
  selector: 'jhi-document-history-detail',
  templateUrl: './document-history-detail.component.html'
})
export class DocumentHistoryDetailComponent implements OnInit {
  documentHistory: IDocumentHistory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentHistory }) => {
      this.documentHistory = documentHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
