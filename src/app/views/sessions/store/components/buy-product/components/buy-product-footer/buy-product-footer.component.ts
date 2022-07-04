import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'app/shared/services/local-store.service';

@Component({
  selector: 'buy-product-footer',
  templateUrl: './buy-product-footer.component.html',
  styleUrls: ['./buy-product-footer.component.scss']
})
export class BuyProductFooterComponent implements OnInit {
  ADD_TO_CART = "add-to-cart";
  constructor(private ls: LocalStoreService) { }

  ngOnInit(): void {
  }

  quantityAddToCart() {
    var quantity = 0;
    var productArr = this.ls.getItem(this.ADD_TO_CART);
    for (var i = 0; i < productArr.length; i++){
      quantity += productArr[i].Quantity;
    }
    return quantity;
  }

  totalPrice() {
    var totalPrice = 0;
    var productArr = this.ls.getItem(this.ADD_TO_CART);
    for (var i = 0; i < productArr.length; i++){
      totalPrice += productArr[i].Quantity * productArr[i].Price;
    }
    totalPrice = Math.round(totalPrice)
    return totalPrice;
  }

}
