import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuyProductRoutes } from './buy-product.routing';
import { BuyProductCardComponent } from './components/buy-product-card/buy-product-card.component';
import { BuyProductComponent } from './buy-product.component';
import { BuyProductHeaderComponent } from './components/buy-product-header/buy-product-header.component';
import { BuyProductFooterComponent } from './components/buy-product-footer/buy-product-footer.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@NgModule({
  declarations: [BuyProductComponent,BuyProductCardComponent, BuyProductHeaderComponent, BuyProductFooterComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule.forChild(BuyProductRoutes)
  ]
})
export class BuyProductModule { }
