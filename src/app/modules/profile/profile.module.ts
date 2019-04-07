import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';

@NgModule({
  declarations: [ ProfileComponent, AboutMeComponent ],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
