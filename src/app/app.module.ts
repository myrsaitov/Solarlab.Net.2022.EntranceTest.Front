import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './app-components/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { CardPaginationComponent } from './app-components/instances/card/card-pagination/card-pagination.component';
import { CardViewLowDetailsComponent } from './app-components/instances/card/card-view-low-details/card-view-low-details.component';
import { CardViewHighDetailsComponent } from './app-components/instances/card/card-view-high-details/card-view-high-details.component';
import { DashboardComponent } from './app-components/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './app-components/router-pages/view/view.component';
import { BottomBarComponent } from './app-components/bottom-bar/bottom-bar.component';
import { LeftColumnComponent } from './app-components/left-column/left-column.component';
import { RightColumnComponent } from './app-components/right-column/right-column.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CardPaginationComponent,
    CardViewLowDetailsComponent,
    CardViewHighDetailsComponent,
    DashboardComponent,
    ViewComponent,
    BottomBarComponent,
    LeftColumnComponent,
    RightColumnComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'cards/:cardId', component: ViewComponent},
    ]),
    MatGridListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
