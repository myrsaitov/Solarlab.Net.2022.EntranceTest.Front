import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/app/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { CardPaginationComponent } from './components/business/card/card-pagination/card-pagination.component';
import { CardViewLowDetailsComponent } from './components/business/card/card-view-low-details/card-view-low-details.component';
import { CardViewHighDetailsComponent } from './components/business/card/card-view-high-details/card-view-high-details.component';
import { DashboardComponent } from './components/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './components/router-pages/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CardPaginationComponent,
    CardViewLowDetailsComponent,
    CardViewHighDetailsComponent,
    DashboardComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'cards/:cardId', component: ViewComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
