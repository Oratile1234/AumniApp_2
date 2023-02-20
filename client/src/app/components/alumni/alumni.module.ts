import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniComponent } from './alumni.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RouterModule, Routes } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from "primeng/rating";
// import { StarRatingModule } from 'angular-star-rating';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AuthGuard } from 'src/app/gaurds/auth.guard';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {path:'alumni', component:AlumniComponent, canActivate: [AuthGuard],
  children:[
    {path:'profile', component: ProfileComponent},
    {path:'notifs', component: NotificationsComponent},
    {path:'home', component: UserHomeComponent},
    {path:'alumni', redirectTo:'/alumni/profile', pathMatch:'full'}
  ]},
]

@NgModule({
  declarations: [
    AlumniComponent,
    ProfileComponent,
    NotificationsComponent,
    PortfolioComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule ,
    RatingModule,
    [RouterModule.forChild(routes)],
    MessagesModule,
    MessageModule,
    DialogModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    FormsModule,
    RatingModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    ToastModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    })


  ]
})
export class AlumniModule { }
