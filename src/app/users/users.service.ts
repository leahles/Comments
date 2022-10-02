import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Observable, Subject } from 'rxjs';
import { IUser } from './IUser';
import * as data from '../users.json';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList:IUser[] = (data as any).default;

  constructor(private http: HttpClient) {
    localStorage.setItem('usersList',JSON.stringify(this.usersList))
  }



  getUserDetails(id:number):IUser{
    return this.usersList.find(x => x.id == id)!
  }
}
