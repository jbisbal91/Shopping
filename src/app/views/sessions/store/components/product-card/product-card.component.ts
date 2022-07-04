import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'app/shared/models/product.model';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductCardDetailsComponent } from '../product-card-details/product-card-details.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input() product:any;
  productArr: Product[] = [];
  ADD_TO_CART = "add-to-cart";

  ratingArr = [];
  private rating: number = 3;
  private starCount: number = 5;

  _imageUrl:string = '';
  _description:string = '';
  _rating:string = '';
  _price:string = '';
  constructor(private ls: LocalStoreService,
    public dialog: MatDialog) { }
 
  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    var product = changes.product.currentValue;
    if(product !== undefined){
      this._imageUrl = product.ImgUrl;
      this._description = product.Description;
      this._rating = product.Rating;
      this._price = `${product.Price}`;
      this.rating = product.RatingValue;
    }
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  addToCart(){
  this.productArr = this.ls.getItem(this.ADD_TO_CART);
  var index = this.productArr.findIndex(p => p.Id === this.product.Id);
   if(index!==-1) {
    this.productArr[index].Quantity +=1; 
   }else{
    this.product.Quantity +=1;
    this.productArr.push(this.product);
   }
    this.ls.setItem(this.ADD_TO_CART, this.productArr);
  }

  openDetailsProduct(){
    const dialogRef = this.dialog.open(ProductCardDetailsComponent,{
      data:this.product
    }
    );
  }

}
