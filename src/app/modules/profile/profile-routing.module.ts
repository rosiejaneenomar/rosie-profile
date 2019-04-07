import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {
        path: 'about-me', component: AboutMeComponent
      },
      {
        path: 'projects',
        loadChildren: '../practices/generate-pdf/generate-pdf.module#GeneratePdfModule'
      }
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
