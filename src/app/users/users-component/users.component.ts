import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IUser } from '../IUser';
import{UsersService} from '../users.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private UsersService:UsersService) { }

  ngOnInit(): void {
      this.users = JSON.parse(localStorage.getItem('usersList')!);
      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        startWith(''),
        map(user => (user ? this._filterUserss(user) : this.users.slice())),
      );
   }
   userCtrl = new FormControl('');
   filteredUsers!: Observable<IUser[]>;
   users: IUser[]=[];
   saveUser(user:IUser){
    localStorage.setItem('currentUser',JSON.stringify(user))
   }

  private _filterUserss(value: string): IUser[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(state => state.displayName.toLowerCase().includes(filterValue));
  }
}
