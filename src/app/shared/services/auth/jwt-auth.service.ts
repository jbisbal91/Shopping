import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { StoreService } from "../store.service";


@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user!: User;
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  JWT_TOKEN = "user-token";
  APP_USER = "user-data";
  ADD_TO_CART = "add-to-cart";
  productArr:any[] = [];
  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private storeService:StoreService
  ) {}

  public signin(user: User) {
  this.signingIn = true;
   return this.http.get(`${environment.apiURL}/Auth/${user.id}`)
       .pipe(
         map((res: any) => {
           this.setUserAndToken(res.Token, user, !!res);
           this.signingIn = false;
           return res;
         }),
         catchError((error) => {
           return throwError(error);
         })
       );
  }

  public checkTokenIsValid() {
    return of(this.ls.getItem(this.APP_USER))
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  public signout() {
    this.storeService.getUser(this.user.id).subscribe(user => {
      if(user!==undefined) {
        user.Active = false;
        this.storeService.updateUser(user).subscribe(_=>{}); 
      }
    })
    this.setUserAndToken(null, null, false);
    this.productArr = [];
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
    this.ls.setItem(this.ADD_TO_CART, this.productArr);
  }
}