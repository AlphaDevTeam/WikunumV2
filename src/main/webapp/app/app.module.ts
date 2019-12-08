import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { WikunumV2CoreModule } from 'app/core/core.module';
import { WikunumV2AppRoutingModule } from './app-routing.module';
import { WikunumV2HomeModule } from './home/home.module';
import { WikunumV2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    WikunumV2SharedModule,
    WikunumV2CoreModule,
    WikunumV2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WikunumV2EntityModule,
    WikunumV2AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class WikunumV2AppModule {}
