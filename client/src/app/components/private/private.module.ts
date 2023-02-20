import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadEmployeeComponent } from './upload-employee/upload-employee.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AlumniComponent } from './alumni/alumni.component';
import { BlogComponent } from './blog/blog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import {DropdownModule} from 'primeng/dropdown';
import {ContextMenuModule} from 'primeng/contextmenu';
import {SliderModule} from 'primeng/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { NgxPaginationModule } from 'ngx-pagination';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ListFilterPipe } from '../../list-filter-pipe.pipe';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { AuthGuard } from 'src/app/gaurds/auth.guard';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import { RatingModule } from "primeng/rating";

const routes: Routes = [
  {path:'private', component:PrivateComponent, canActivate: [AuthGuard],
  children:[
    {path:'', component: LandingPageComponent},
    {path:'profile', component: ProfileComponent},
    {path:'users', component: UserManagementComponent},
    {path:'notifs', component: NotificationsComponent},
    {path:'alumni', component: AlumniComponent},
    {path:'blogs', component: BlogComponent},
    {path:'upload', component: UploadEmployeeComponent},
    {path:'prev', component: PreviewComponent},
    {path:'private/home', redirectTo:(btoa('/private')), pathMatch:'full'}
  ]},
]

@NgModule({
  declarations: [
    LandingPageComponent,
    UserManagementComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    PrivateComponent,
    UploadEmployeeComponent,
    NotificationsComponent,
    AlumniComponent,
    BlogComponent,
    PreviewComponent,
    ListFilterPipe,
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    RippleModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    DropdownModule,
    ContextMenuModule,
    SliderModule,
    RatingModule,
    TableModule,
    BrowserAnimationsModule,
    NgxPaginationModule, NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,2)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true,
    })

  ],
  providers: [DatePipe],
  exports: [ListFilterPipe]
})
export class PrivateModule { }
