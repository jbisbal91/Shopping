import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { StoreService } from 'app/shared/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  cols = 0;
  gridList:string = '';
  laptop:any[] = [];
  arrayReset:any[] = [];
  products:any[] = [];
  data: Array<string> = ['Laptop','Televisor','Telefono'];

  filterByList: Array<string> = [];

  constructor(private storeService: StoreService) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getAllLaptops()
  }

  getAllLaptops(){
    this.storeService.getAllLaptops().subscribe(laptop =>{
      if(laptop !== undefined){
        this.laptop = laptop;
        this.arrayReset = laptop;
        this.products = laptop;
      }
    })
  }

  selectionChange(event:any){
    this.filterByList = event.data;
    this.selectedFilter();
  }

  selectedFilter(){
    this.products = [];
    if (this.filterByList.length === 0) {
      this.products =  this.arrayReset;
    }
    var products:any[] = []; 
    for (let i = 0; i < this.filterByList.length; i++){
      products = this.arrayReset.filter((product:any) => product.TypeProduct === this.filterByList[i]);
      products.forEach((product:any) => {
        this.products.push(product);
      })
     
    }
  
  }


  screenHeight :any;
  screenWidth:any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if(this.screenWidth >= 1750){
          this.cols = 3;
          this.gridList = 'grid-container-c4';
        }
        if(this.screenWidth >= 1366 && this.screenWidth < 1750){
          this.gridList = 'grid-container-c3';
        }
        if(this.screenWidth >= 837 && this.screenWidth < 1366){
          this.gridList = 'grid-container-c2';
        }
       if(this.screenWidth < 837 ){
          this.cols = 1;
          this.gridList = 'grid-container-c1';
        }
  }

}
