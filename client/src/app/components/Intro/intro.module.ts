import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro.component';
import { SplashComponent } from './splash/splash.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



const routes: Routes = [
  {path:'intro', component:IntroComponent,
    children:[ 
      {path:'splash', component:SplashComponent},
      {path:'', redirectTo:'/intro/splash', pathMatch:'full'}
    ]
  }
]


@NgModule({
  declarations: [
    SplashComponent,
    IntroComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ]
})
export class IntroModule { }
