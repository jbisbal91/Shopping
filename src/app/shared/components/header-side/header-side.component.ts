import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { User } from 'app/shared/models/user.model';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentUser!:User;
  image:string = '';

  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];
  ADD_TO_CART = "add-to-cart";
  public matxThemes;
  public layoutConf:any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private router: Router,
    private ls: LocalStoreService
  ) {}
  ngOnInit() {
    this.currentUser = this.jwtAuth.getUser();
    this.image = this.currentUser.image;
    this.matxThemes = this.themeService.matxThemes;
    this.layoutConf = this.layout.layoutConf;
  }
  setLang(lng) {
    
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }

  addCart(){
    this.router.navigate(["/buy/products"]);
  }

  quantityAddToCart(){
    var quantity = 0;
    var productArr = this.ls.getItem(this.ADD_TO_CART);
    for (var i = 0; i < productArr.length; i++){
      quantity += productArr[i].Quantity;
    }
    return quantity;
  }
  
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  onSearch(e) {
    //   console.log(e)
  }
}