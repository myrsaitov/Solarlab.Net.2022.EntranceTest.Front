import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './app-components/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './app-components/router-pages/view/view.component';
import { LeftColumnComponent } from './app-components/ui-elements/left-column/left-column.component';
import { RightColumnComponent } from './app-components/ui-elements/right-column/right-column.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CongratulationCardComponent} from "./app-components/ui-elements/congratulation-card/congratulation-card.component";
import {VirtualScrollerModule} from "ngx-virtual-scroller";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewComponent,
    LeftColumnComponent,
    RightColumnComponent,
    CongratulationCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'congratulations/:congratulationId', component: ViewComponent},
    ]),
    MatGridListModule,
    BrowserAnimationsModule,
    VirtualScrollerModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
