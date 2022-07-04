import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { StoreRoutes } from './store.routing';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { MultiSelectModule } from 'app/shared/components/multi-select/multi-select.module';
import { ProductCardDetailsComponent } from './components/product-card-details/product-card-details.component';
import {MatDialogModule} from '@angular/material/dialog'; 

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MultiSelectModule,
    MatDialogModule,
    RouterModule.forChild(StoreRoutes)
  ],
  declarations: [StoreComponent, ProductCardComponent, ProductCardDetailsComponent]
})
export class StoreModule { }
