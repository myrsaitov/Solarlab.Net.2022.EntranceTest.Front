import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import { CardListComponent } from './components/card/card-list/card-list.component';
import { CardAlertsComponent } from './components/card/card-alerts/card-alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CardListComponent,
    CardAlertsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: CardListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
