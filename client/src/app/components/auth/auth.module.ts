import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Register2Component } from './register/register2/register2.component';
import { Register3Component } from './register/register3/register3.component';
import { Register4Component } from './register/register4/register4.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  {path:'auth', component:AuthComponent, 
    children:[
      {path:'login', component:LoginComponent},
      {path:'step', component:RegisterComponent},
      {path:'step2', component: Register2Component},
      {path:'step3', component: Register3Component},
      {path:'step4', component: Register4Component},
      {path:'auth', redirectTo:'/auth/login', pathMatch:'full'}
  ], },
];

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    Register2Component,
    Register3Component,
    Register4Component,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
    

    [RouterModule.forChild(routes)]
  ]
})
export class AuthModule { }
