import { Component, Inject,EventEmitter, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStoreService } from 'app/shared/services/local-store.service';

@Component({
  selector: 'product-card-details',
  templateUrl: './product-card-details.component.html',
  styleUrls: ['./product-card-details.component.scss']
})
export class ProductCardDetailsComponent implements OnInit {
  ADD_TO_CART = "add-to-cart";
  product:any;


  constructor(private ls: LocalStoreService,
    public dialogRef: MatDialogRef<ProductCardDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.fillData(data);
  }



  _imageUrl:string = '';
  _description:string = '';
  _rating:string = '';
  _price:string = '';
  _quantity:string = '';

  ngOnInit(): void {
  }

  
  fillData(product: any): void {
    this.product = product;
    if(product !== undefined){
      this._imageUrl = product.ImgUrl;
      this._description = product.Description;
      this._rating = product.Rating;
      this._price = `${product.Price}`;
      this._quantity = `${product.Quantity}`;
    }
  }

  addToCart(){
    var productArr = this.ls.getItem(this.ADD_TO_CART);
    var index = productArr.findIndex(p => p.Id === this.product.Id);
     if(index!==-1) {
      productArr[index].Quantity +=1; 
     }else{
      this.product.Quantity +=1;
      productArr.push(this.product);
     }
      this.ls.setItem(this.ADD_TO_CART, productArr);
    }

    cancelDetail(){
      this.dialogRef.close();
    }   

}
