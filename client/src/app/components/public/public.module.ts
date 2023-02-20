import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PublicComponent } from './public.component';
import { RouterModule, Routes } from '@angular/router';
import { CardAlumniComponent } from './card-alumni/card-alumni.component';
import { ExploreComponent } from './explore/explore.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {DialogModule} from 'primeng/dialog';
import { ListFilterPipePipe } from '../../list-filter.pipe';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';

const routes: Routes = [
  {path:'public', component:PublicComponent,
    children:[
      {path:'explore', component:ExploreComponent},
      {path:'password', component:PasswordResetComponent},
      {path:'setpassword', component:SetPasswordComponent},
      {path:'public', redirectTo:'/public/explore', pathMatch:'full'}
    ]
  }
]

@NgModule({
  declarations: [
    PublicComponent,
    CardAlumniComponent,
    ExploreComponent,
    NavbarComponent,
    ListFilterPipePipe,
    PasswordResetComponent,
    SetPasswordComponent,
    // CardAlumniComponent
    
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    HttpClientModule,
    NgxPaginationModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    MessageModule,
    //////////
    DialogModule,

    NgxStarRatingModule,
 
    RatingModule,
    MultiSelectModule,
    BrowserAnimationsModule,
   

  ],
  exports: [ListFilterPipePipe]
})
export class PublicModule { }
