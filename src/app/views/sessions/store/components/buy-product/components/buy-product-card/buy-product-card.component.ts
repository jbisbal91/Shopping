import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LocalStoreService } from 'app/shared/services/local-store.service';

@Component({
  selector: 'buy-product-card',
  templateUrl: './buy-product-card.component.html',
  styleUrls: ['./buy-product-card.component.scss']
})
export class BuyProductCardComponent implements OnInit, OnChanges {
  @Input() product:any;
  @Output() selectionChange = new EventEmitter<any>();
  ADD_TO_CART = "add-to-cart";
  _product:any;
  constructor(private ls: LocalStoreService) { }

  _imageUrl:string = '';
  _description:string = '';
  _rating:string = '';
  _price:string = '';
  _quantity:string = '';

  ngOnInit(): void {
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    this._product = changes.product.currentValue;
    if(this._product !== undefined){
      this._imageUrl = this._product.ImgUrl;
      this._description = this._product.Description;
      this._rating = this._product.Rating;
      this._price = `${this._product.Price}`;
      this._quantity = `${this._product.Quantity}`;
    }
  }

deleteProduct(){
var productArr = this.ls.getItem(this.ADD_TO_CART);
var index = productArr.findIndex(p => p.Id === this._product.Id);
productArr[index].Quantity -= 1;
this._quantity=  `${productArr[index].Quantity}`;
this.ls.setItem(this.ADD_TO_CART, productArr);
if(this._quantity === '0'){
  productArr.splice(index, 1);
  this.ls.setItem(this.ADD_TO_CART, productArr);
}
this.selectionChange.emit(productArr[index]);
}
}
