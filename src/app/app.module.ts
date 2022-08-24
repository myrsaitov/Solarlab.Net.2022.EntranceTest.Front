import { AuthService } from './services/auth.service';
import { CongratulationComponent } from './pages/congratulation/congratulation.component';
import { CongratulationCardComponent } from './components/congratulation-card/congratulation-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from './interceptors/api-url.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthHeadersInterceptor } from './interceptors/headers.interceptor';
import { CreateCongratulationComponent } from './pages/create-congratulation/create-congratulation.component';
import { ToastsContainerComponent } from './components/toast-container/toast-container.component';
import { EditCongratulationComponent } from './pages/edit-congratulation/edit-congratulation.component';
import { ConnectionpageComponent } from './components/connectionpage/connectionpage.component';

// NgModules configure the injector and the compiler and help organize related things together.
@NgModule({
  declarations: [ // The set of components, directives, and pipes (declarables) that belong to this module.
    AppComponent,
    TagCloudComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CongratulationCardComponent,
    CommentCardComponent,
    CongratulationComponent,
    CreateCongratulationComponent,
    ToastsContainerComponent,
    EditCongratulationComponent,
    ConnectionpageComponent
  ],
  imports: [ // The set of NgModules whose exported declarables are available to templates in this module.
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageFullscreenViewModule,
    NgProgressModule.withConfig({
      color: "green"
    }),
    NgProgressHttpModule
  ],
  providers: [ // The set of injectable objects that are available in the injector of this module.
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.baseAccountsApiUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}