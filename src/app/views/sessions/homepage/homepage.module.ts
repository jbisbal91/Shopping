import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { HomepageComponent } from './homepage.component';
import { RouterModule } from '@angular/router';
import { HomepageRoutes } from './homepage.routing';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(HomepageRoutes)
  ]
})
export class HomepageModule { }
