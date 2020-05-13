import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {CookieService} from "ngx-cookie-service";


import {HttpClient} from "@angular/common/http"; //copied from model.service.ts
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MsAdalAngular6Service} from 'microsoft-adal-angular6';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private adalService: MsAdalAngular6Service) {
  }


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/assets/users.json');
  }


  public getApiKey(): Observable<string | undefined> {
    var userName = this.adalService.userInfo.userName
    return this.http.get<any>('/assets/users.json').pipe(map<any, string>(n => {
      return n[userName];
    }));
  }

  isLoggedIn(): boolean {
    return !!this.adalService.userInfo;
  }
}
