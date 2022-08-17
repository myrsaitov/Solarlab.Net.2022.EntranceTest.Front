import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './app-components/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { CardPaginationComponent } from './instances/card/card-pagination/card-pagination.component';
import { CardViewLowDetailsComponent } from './instances/card/card-view-low-details/card-view-low-details.component';
import { CardViewHighDetailsComponent } from './instances/card/card-view-high-details/card-view-high-details.component';
import { DashboardComponent } from './app-components/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './app-components/router-pages/view/view.component';

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
