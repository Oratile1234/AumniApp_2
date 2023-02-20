import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateModule } from './components/private/private.module';

const routes: Routes = [
  {path:'', redirectTo:'/intro/splash', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, PrivateModule, ]
})
export class AppRoutingModule { }
