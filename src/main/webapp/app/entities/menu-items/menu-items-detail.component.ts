import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuItems } from 'app/shared/model/menu-items.model';

@Component({
  selector: 'jhi-menu-items-detail',
  templateUrl: './menu-items-detail.component.html'
})
export class MenuItemsDetailComponent implements OnInit {
  menuItems: IMenuItems;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ menuItems }) => {
      this.menuItems = menuItems;
    });
  }

  previousState() {
    window.history.back();
  }
}
