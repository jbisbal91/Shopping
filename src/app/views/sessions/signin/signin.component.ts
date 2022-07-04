import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { User } from "app/shared/models/user.model";
import { StoreService } from "app/shared/services/store.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: matxAnimations
})
export class SigninComponent implements OnInit, AfterViewInit {
  signinForm: FormGroup;
  errorMsg = '';
  return: string;
  loading: Boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private matxLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storeService:StoreService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    // setTimeout(() => {
      //this.autoSignIn();
    // })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value
    this.loading = true;
    var userAuth: User ={id:'',displayName:'',image:'',role:''};
    this.http.get(`${environment.apiURL}/User`).subscribe((userList:any) => {
      if(userList!==undefined) {
        var result = userList.filter(user => user.Email === signinData.username && user.Password === signinData.password);
        if(result.length > 0) {
          userAuth.id = result[0].Id;
          userAuth.displayName = result[0].DisplayName;
          userAuth.role = result[0].Role;
          userAuth.image = result[0].Image;
          this.jwtAuth.signin(userAuth).subscribe(response => {
              this.loading = false;
              if(userAuth.role === 'Admin'|| userAuth.role === 'ProUser') {
                this.router.navigateByUrl(this.return);
              }else{
                this.router.navigateByUrl("store");
              }
              result[0].Active = true;
              this.storeService.updateUser(result[0]).subscribe(_=>{});
            }, err => {
              this.loading = false;
              this.errorMsg = err.message;
            })
        }else{
          this.loading = false;
          this.errorMsg = "Error";
        }        
      }
      })
  }
  
  autoSignIn() {    
    if(this.return === '/') {
      return
    }
    this.matxLoader.open(`Automatically Signing you in! \n Return url: ${this.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      this.signin();
      console.log('autoSignIn');
      this.matxLoader.close()
    }, 2000);
  }
}
