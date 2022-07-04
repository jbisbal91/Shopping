import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User, UserApiModel, UserAuth } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(  
    private http: HttpClient,
    private router: Router) { }

  getAllUsers(): Observable<UserApiModel[]> {
    return this.http.get<UserApiModel[]>(`${environment.apiURL}/User`)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
  }


  getUser(id:string): Observable<UserApiModel> {
    return this.http.get<UserApiModel>(`${environment.apiURL}/User/`+`${id}`)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
  }

  createUser(user:UserApiModel): Observable<UserApiModel> {
    return this.http.post<UserApiModel>(`${environment.apiURL}/User/`, user)
    .pipe(
        catchError(err => {
            return throwError(err);
        })
    );
}

createUserAuth(userAuth:UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${environment.apiURL}/Auth`, userAuth)
    .pipe(
        catchError(err => {
            return throwError(err);
        })
    );
}


  updateUser(user:UserApiModel): Observable<UserApiModel> {
    return this.http.put<UserApiModel>(`${environment.apiURL}/User/`+`${user.Id}`, user)
    .pipe(
        catchError(err => {
            return throwError(err);
        })
    );
}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/Product`)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
  }

  getAllLaptops(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/Laptop`)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
  }


}
