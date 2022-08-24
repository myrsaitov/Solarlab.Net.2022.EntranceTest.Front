import {CongratulationComponent} from './pages/congratulation/congratulation.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {CreateCongratulationComponent} from './pages/create-congratulation/create-congratulation.component';
import {EditCongratulationComponent} from './pages/edit-congratulation/edit-congratulation.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'create',
    component: CreateCongratulationComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit/:id',
    component: EditCongratulationComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: ':id',
    component: CongratulationComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}