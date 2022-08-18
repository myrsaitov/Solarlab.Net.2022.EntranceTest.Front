import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './app-components/ui/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './app-components/ui/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './app-components/ui/router-pages/view/view.component';
import { BottomBarComponent } from './app-components/ui/bottom-bar/bottom-bar.component';
import { LeftColumnComponent } from './app-components/ui/left-column/left-column.component';
import { RightColumnComponent } from './app-components/ui/right-column/right-column.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CongratulationCardComponent } from './app-components/ui/congratulation-card/congratulation-card.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {AccountCardComponent} from "./app-components/tools/accountCard/accountCard.component";
import {VirtualScrollModule} from "./app-components/tools/virtualScroll/virtualScroll.module";


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DashboardComponent,
    ViewComponent,
    BottomBarComponent,
    LeftColumnComponent,
    RightColumnComponent,
    CongratulationCardComponent,
    AccountCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'congratulations/:congratulationId', component: ViewComponent},
    ]),
    MatGridListModule,
    BrowserAnimationsModule,
    VirtualScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
