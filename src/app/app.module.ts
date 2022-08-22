import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './app-components/ui-elements/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './app-components/router-pages/dashboard/dashboard.component';
import { ViewComponent } from './app-components/router-pages/view/view.component';
import { BottomBarComponent } from './app-components/ui-elements/bottom-bar/bottom-bar.component';
import { LeftColumnComponent } from './app-components/ui-elements/left-column/left-column.component';
import { RightColumnComponent } from './app-components/ui-elements/right-column/right-column.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccountCardComponent} from "./app-components/ui-elements/account-card/accountCard.component";
import {VirtualScrollerModule} from "ngx-virtual-scroller";


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DashboardComponent,
    ViewComponent,
    BottomBarComponent,
    LeftColumnComponent,
    RightColumnComponent,
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
        VirtualScrollerModule
    ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
