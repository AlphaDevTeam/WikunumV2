import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUOM } from 'app/shared/model/uom.model';

@Component({
  selector: 'jhi-uom-detail',
  templateUrl: './uom-detail.component.html'
})
export class UOMDetailComponent implements OnInit {
  uOM: IUOM;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ uOM }) => {
      this.uOM = uOM;
    });
  }

  previousState() {
    window.history.back();
  }
}
