import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuth.isLoggedIn() && this.isActive(state.url)) {
     return true;
    } else {
      this.router.navigate(["/sessions/signin"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }

  isActive(url:string){
    var value:boolean = false;
    var user = this.jwtAuth.getUser();
    if(user.role === 'Admin' && url !== "/store"){
      value = true;
    }
    if(user.role === 'Admin' && url === "/store"){
      value = false;
    }
    if(user.role === 'ProUser' && url !== "/store"){
      value = true;
    }
    if(user.role === 'ProUser' && url === "/store"){
      value = false;
    }
    if(user.role === 'User' && url !== "/store"){
      value = false;
    }
    if(user.role === 'User' && url === "/store"){
      value = true;
    }
    if(user.role === 'User' && url === "/buy/products"){
      value = true;
    }
    if((user.role === 'Admin' || user.role === 'ProUser') && url === "/buy/products"){
      value = false;
    }
    return value;   
  }
}